/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FRT2K03MFLK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Toast() {
  return (
    <div className="fixed bottom-4 left-4 z-50 w-[340px] max-w-full">
      <div className="rounded-lg bg-gradient-to-r from-foreground to-default p-1 shadow-lg">
        <div className="flex items-center gap-4 rounded-md bg-background p-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-foreground text-primary-foreground">
            <CircleCheckIcon className="size-6" />
          </div>
          <div>
            <h4 className="text-md font-medium">Success</h4>
            <p className="text-sm text-muted-foreground">
              Your changes have been saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
