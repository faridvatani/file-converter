'use client';
import { Toast, toast as hotToast } from 'react-hot-toast';
import { CircleCheckIcon, CircleXIcon, WarningIcon } from '@/components/icons';

interface ToastProps extends Partial<Toast> {
  variant?: 'success' | 'error' | 'warning' | 'default';
  title?: string;
  description?: string;
}

/**
 *  Generate by AI at https://v0.dev by Farid Vatani
 * @see https://v0.dev/t/FRT2K03MFLK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export const toast = ({
  variant = 'default',
  title,
  description,
  ...props
}: ToastProps) => {
  return hotToast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        }  bottom-4 left-4 z-50 max-w-md w-full pointer-events-auto shadow-lg rounded-lg`}
      >
        <div
          className={`rounded-lg p-1 shadow-lg ${getGradientClass(variant)}`}
        >
          <div className="flex items-center gap-4 rounded-md bg-background p-3">
            {getIcon(variant) && (
              <div
                className={`flex size-10 items-center justify-center rounded-md ${getIconBgClass(
                  variant
                )} text-primary-foreground`}
              >
                {getIcon(variant)}
              </div>
            )}
            <div>
              <h4 className="text-md font-medium">{title}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...props, position: props.position || 'bottom-center' }
  );
};

const getGradientClass = (variant?: string) => {
  switch (variant) {
    case 'success':
      return 'bg-gradient-to-r from-green-600 to-green-400';
    case 'error':
      return 'bg-gradient-to-r from-red-600 to-red-400';
    case 'warning':
      return 'bg-gradient-to-r from-yellow-600 to-yellow-400';
    default:
      return 'bg-gradient-to-r from-violet-600 to-violet-400';
  }
};

const getIconBgClass = (variant?: string) => {
  switch (variant) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    default:
      return;
  }
};

const getIcon = (variant?: string) => {
  switch (variant) {
    case 'success':
      return <CircleCheckIcon className="size-6" />;
    case 'error':
      return <CircleXIcon className="size-6" />;
    case 'warning':
      return <WarningIcon className="size-6" />;
    default:
      return;
  }
};
