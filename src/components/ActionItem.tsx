import { useState } from 'react';
import { ConvertAction } from '@/types';
import { bytesToSize, compressFileName } from '@/utils';
import fileToIcon from '@/utils/file-to-icon';
import { MdClose } from 'react-icons/md';
import { fileExtensions } from '@/config/site';
import { ImSpinner3 } from 'react-icons/im';
import { MdDone } from 'react-icons/md';
import { HiOutlineDownload } from 'react-icons/hi';
import { BiError } from 'react-icons/bi';
import {
  Chip,
  Button,
  Select,
  SelectItem,
  SelectSection,
  Skeleton,
} from '@nextui-org/react';

interface ActionItemProps {
  actions: ConvertAction[];
  isLoading: boolean;
  isDone: boolean;
  isReady: boolean;
  isConverting: boolean;
  deleteAction: (action: ConvertAction) => void;
  updateAction: (file_name: string, to: string) => void;
  convert: () => void;
  reset: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  actions,
  isLoading,
  isDone,
  isReady,
  isConverting,
  deleteAction,
  updateAction,
  convert,
  reset,
}) => {
  const selectSectionClass =
    'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small';

  const [selected, setSelected] = useState<string>('...');

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

  const getDisabledKeys = () => {
    if (!actions.length) return [];

    const fileType = actions[0].file_type.split('/')[0];
    if (fileType === 'image') {
      return [...fileExtensions.video, ...fileExtensions.audio];
    } else if (fileType === 'video' || fileType === 'audio') {
      return fileExtensions.image;
    }

    return [];
  };

  return (
    <div className="w-full max-w-5xl space-y-6">
      {actions.map((action: ConvertAction, i: any) => (
        <div
          key={i}
          className="w-full py-4 space-y-2 md:py-0 relative cursor-pointer rounded-xl border h-fit md:h-20 px-4 md:px-10 flex flex-wrap md:flex-nowrap items-center justify-between"
        >
          {!isLoading && (
            <Skeleton className="h-full w-full -ml-4 md:-ml-10 cursor-progress absolute rounded-xl z-20" />
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
        {isDone ? (
          <div className="space-y-4 w-fit">
            <Button
              size="lg"
              color="primary"
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
            color="primary"
            isDisabled={!isReady || isConverting}
            className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
            onClick={convert}
          >
            {isConverting ? (
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
};

export default ActionItem;
