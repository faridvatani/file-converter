import { ConvertAction } from '@/types';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Bytes to size
export function bytesToSize(bytes: number): String {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return '0 Byte';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}

// compress File Name
export function compressFileName(fileName: any): string {
  // Define the maximum length for the substring
  const maxSubstrLength = 18;

  // Check if the fileName is longer than the maximum length
  if (fileName.length > maxSubstrLength) {
    // Extract the first part of the fileName (before the extension)
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');

    // Extract the extension from the fileName
    const fileExtension = fileName.split('.').pop();

    // Calculate the length of characters to keep in the middle
    const charsToKeep =
      maxSubstrLength -
      (fileNameWithoutExtension.length + fileExtension.length + 3);

    // Create the compressed fileName
    const compressedFileName =
      fileNameWithoutExtension.substring(
        0,
        maxSubstrLength - fileExtension.length - 3
      ) +
      '...' +
      fileNameWithoutExtension.slice(-charsToKeep) +
      '.' +
      fileExtension;

    return compressedFileName;
  } else {
    // If the fileName is shorter than the maximum length, return it as is
    return fileName.trim();
  }
}

function getFileExtension(file_name: string) {
  const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }
  return ''; // No file extension found
}

function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }
  return file_name; // No file extension found
}

export async function convert(
  ffmpeg: FFmpeg,
  action: ConvertAction
): Promise<any> {
  const { file, to, file_name, file_type } = action;
  const input = getFileExtension(file_name);
  const output = removeFileExtension(file_name) + '.' + to;
  ffmpeg.writeFile(input, await fetchFile(file));

  // FFMEG COMMANDS
  let ffmpeg_cmd: any = [];

  // Use codec copy for faster transcoding
  ffmpeg_cmd = ['-i', input, '-codec', 'copy', output];

  // 3gp video
  if (to === '3gp') {
    ffmpeg_cmd = [
      '-i',
      input,
      '-r',
      '20',
      '-s',
      '352x288',
      '-vb',
      '400k',
      '-acodec',
      'aac',
      '-strict',
      'experimental',
      '-ac',
      '1',
      '-ar',
      '8000',
      '-ab',
      '24k',
      output,
    ];
  }

  // execute cmd
  await ffmpeg.exec(ffmpeg_cmd);

  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: file_type.split('/')[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
}

async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  errorMessage: string
): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) {
        if (error instanceof Error) {
          throw new Error(`${errorMessage}: ${error.message}`);
        } else {
          throw new Error(`${errorMessage}: Unknown error occurred`);
        }
      }
      if (error instanceof Error) {
        console.warn(
          `Attempt ${attempt} failed: ${error.message}. Retrying...`
        );
      } else {
        console.warn(
          `Attempt ${attempt} failed: Unknown error occurred. Retrying...`
        );
      }
    }
  }
  throw new Error('Max retries reached');
}

// load FFmpeg
export async function loadFfmpeg(retries = 3): Promise<FFmpeg> {
  const ffmpeg = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';

  const coreURL = await retry(
    () => toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    retries,
    'Failed to construct core URL'
  );

  const wasmURL = await retry(
    () => toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    retries,
    'Failed to construct wasm URL'
  );

  await retry(
    () => ffmpeg.load({ coreURL, wasmURL }),
    retries,
    'Failed to load FFmpeg'
  );

  return ffmpeg;
}
