'use client';
import { useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { LuFileSymlink } from 'react-icons/lu';
import { toast } from '@/components/toast';
import { ConvertAction } from '@/types';
import {
  Chip,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  SelectSection,
  Skeleton,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { MdClose } from 'react-icons/md';
import { ImSpinner3 } from 'react-icons/im';
import { MdDone } from 'react-icons/md';
import { HiOutlineDownload } from 'react-icons/hi';
import { BiError } from 'react-icons/bi';
import {
  loadFfmpeg,
  convert as convertFile,
  compressFileName,
  bytesToSize,
} from '@/utils';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import fileToIcon from '@/utils/file-to-icon';
import { fileExtensions } from '@/config/site';

export default function MyDropzone() {
  const selectSectionClass =
    'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small';
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<ConvertAction[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [is_done, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);
  const [defaultValues, setDefaultValues] = useState<string>('video');
  const [selected, setSelected] = useState<string>('...');

  const accepted_files = {
    'image/*': [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.webp',
      '.ico',
      '.tif',
      '.tiff',
      '.raw',
      '.tga',
    ],
    'audio/*': [],
    'video/*': [],
  };

  // functions
  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };
  const downloadAll = (): void => {
    for (let action of actions) {
      !action.is_error && download(action);
    }
  };
  const download = (action: ConvertAction) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };
  const convert = async (): Promise<any> => {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);
    for (let action of tmp_actions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };
  const handleUpload = (data: Array<any>): void => {
    handleExitHover();
    setFiles(data);
    const tmp: ConvertAction[] = [];
    data.forEach((file: any) => {
      const formData = new FormData();
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });
    setActions(tmp);
  };
  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);
  const updateAction = (file_name: String, to: String) => {
    setActions(
      actions.map((action): ConvertAction => {
        if (action.file_name === file_name) {
          return {
            ...action,
            to,
          };
        }

        return action;
      })
    );
  };
  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    actions.forEach((action: ConvertAction) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };
  const deleteAction = (action: ConvertAction): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsLoaded(true);
  };

  const getDisabledKeys = () => {
    if (!actions.length) return [];

    const fileType = actions[0].file_type.split('/')[0]; // Get the main type (image, audio, video)
    if (fileType === 'image') {
      return [...fileExtensions.video, ...fileExtensions.audio];
    } else if (fileType === 'video' || fileType === 'audio') {
      return fileExtensions.image;
    }

    return [];
  };

  if (actions.length) {
    return (
      <div className="w-full max-w-5xl space-y-6">
        {actions.map((action: ConvertAction, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 md:py-0 relative cursor-pointer rounded-xl border h-fit md:h-20 px-4 md:px-10 flex flex-wrap md:flex-nowrap items-center justify-between"
          >
            {!is_loaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl z-40" />
            )}
            <div className="flex gap-4 items-center whitespace-wrap truncate">
              <span className="text-2xl text-orange-600">
                {fileToIcon(action.file_type)}
              </span>
              <div className="flex items-center gap-1 w-96">
                <span className="text-md font-medium overflow-x-hidden">
                  {compressFileName(action.file_name)}
                </span>
                <span className="text-muted-foreground text-sm">
                  ({bytesToSize(action.file_size)})
                </span>
              </div>
            </div>

            {action.is_error ? (
              <Chip color="danger" startContent={<BiError size={18} />}>
                <span>Error Converting File</span>
              </Chip>
            ) : action.is_converted ? (
              <Chip color="success" startContent={<MdDone size={18} />}>
                <span>Done</span>
              </Chip>
            ) : action.is_converting ? (
              <Chip
                color="primary"
                startContent={
                  <span className="animate-spin">
                    <ImSpinner3 size={18} />
                  </span>
                }
              >
                <span>Converting</span>
              </Chip>
            ) : (
              <div className="text-muted-foreground text-md flex items-center md:justify-center w-full max-w-xs">
                <Select
                  label="Convert to"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value;
                    if (fileExtensions.audio.includes(value)) {
                      setDefaultValues('audio');
                    } else if (fileExtensions.video.includes(value)) {
                      setDefaultValues('video');
                    } else if (fileExtensions.image.includes(value)) {
                      setDefaultValues('image');
                    }
                    setSelected(value);
                    updateAction(action.file_name, value);
                  }}
                  disabledKeys={getDisabledKeys()}
                  placeholder="Select Format"
                  value={selected}
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  className="max-w-xs md:max-w-md"
                  size="sm"
                  aria-label={action.file_name}
                >
                  {fileExtensions.image && (
                    <SelectSection
                      title="Image"
                      aria-label="Image"
                      classNames={{
                        heading: selectSectionClass,
                      }}
                    >
                      {fileExtensions.image.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectSection>
                  )}
                  {fileExtensions.video && (
                    <SelectSection
                      title="Video"
                      aria-label="Video"
                      classNames={{
                        heading: selectSectionClass,
                      }}
                    >
                      {fileExtensions.video.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectSection>
                  )}
                  {fileExtensions.audio && (
                    <SelectSection
                      title="Audio"
                      aria-label="Audio"
                      classNames={{
                        heading: selectSectionClass,
                      }}
                    >
                      {fileExtensions.audio.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectSection>
                  )}
                </Select>

                {/* <Select
                  label="Assigned to"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value;
                    if (fileExtensions.audio.includes(value)) {
                      setDefaultValues('audio');
                    } else if (fileExtensions.video.includes(value)) {
                      setDefaultValues('video');
                    }
                    setSelected(value);
                    updateAction(action.file_name, value);
                  }}
                  placeholder="Select Format"
                  value={selected}
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                >
                  <>
                    {action.file_type.includes('image') && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {fileExtensions.image.map((elt, i) => (
                          <SelectItem
                            key={i}
                            value={elt}
                            className="col-span-1 text-center"
                          >
                            <div key={i} className="mx-auto">
                              {elt}
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    )}
                    {action.file_type.includes('video') && (
                      <Tabs
                        aria-label="Options"
                        defaultSelectedKey={defaultValues}
                        className="w-full"
                      >
                        <Tab title="video" className="w-full">
                          <Card>
                            <CardBody>
                              <div className="grid grid-cols-3 gap-2 w-fit">
                                {fileExtensions.video.map((elt, i) => (
                                  <SelectItem
                                    key={i}
                                    value={elt}
                                    className="col-span-1 text-center"
                                  >
                                    <div key={i} className="mx-auto">
                                      {elt}
                                    </div>
                                  </SelectItem>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        </Tab>
                        <Tab title="audio" className="w-full">
                          <Card>
                            <CardBody>
                              <div className="grid grid-cols-3 gap-2 w-fit">
                                {fileExtensions.audio.map((elt, i) => (
                                  <SelectItem
                                    key={i}
                                    value={elt}
                                    className="col-span-1 text-center"
                                  >
                                    <div key={i} className="mx-auto">
                                      {elt}
                                    </div>
                                  </SelectItem>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        </Tab>
                      </Tabs>
                    )}
                    {action.file_type.includes('audio') && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {fileExtensions.audio.map((elt, i) => (
                          <SelectItem
                            key={i}
                            value={elt}
                            className="col-span-1 text-center"
                          >
                            <div key={i} className="mx-auto">
                              {elt}
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    )}
                  </>
                </Select> */}
              </div>
            )}

            {action.is_converted ? (
              <Button variant="bordered" onClick={() => download(action)}>
                Download
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    deleteAction(action);
                  }
                }}
                tabIndex={0}
                role="button"
                className="cursor-pointer hover:bg-muted rounded-full h-10 w-10 flex items-center justify-center text-2xl text-foreground"
              >
                <MdClose />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {is_done ? (
            <div className="space-y-4 w-fit">
              <Button
                size="lg"
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {actions.length > 1 ? 'Download All' : 'Download'}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                onClick={reset}
                variant="bordered"
                className="rounded-xl"
              >
                Convert Another File(s)
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              color="default"
              disabled={!is_ready || is_converting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {is_converting ? (
                <span className="animate-spin text-lg">
                  <ImSpinner3 />
                </span>
              ) : (
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Dropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: 'error',
          title: 'Error uploading your file(s)',
          description: 'Allowed Files: Audio, Video and Images.',
        });
      }}
      onError={() => {
        handleExitHover();
        toast({
          variant: 'error',
          title: 'Error uploading your file(s)',
          description: 'Allowed Files: Audio, Video and Images.',
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="flex items-center justify-center w-full max-w-5xl bg-default-50 h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-default-200 border-dashed cursor-pointer"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-foreground">
            {isHover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <LuFileSymlink />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, Right there
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <FiUploadCloud />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Click, or drop your files here
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </Dropzone>
  );
}
