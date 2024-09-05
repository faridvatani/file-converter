"use client";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";

export default function MyDropzone() {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Dropzone
      onDrop={() => console.log("onDrap")}
      onDragEnter={() => console.log("first")}
      onDragLeave={() => console.log("first")}
      // accept={()=>console.log("accept")}
      onDropRejected={() => console.log("onDropRejected")}
      onError={() => console.log("onError")}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="flex items-center justify-center w-full max-w-5xl bg-background h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-default-200 border-dashed cursor-pointer"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-foreground">
            {isHover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <LuFileSymlink />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, right there
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
