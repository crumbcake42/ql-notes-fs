"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";

const DebugButton = dynamic(() => import("./DirectoryViewDebugButtons"), {
  ssr: false,
});

const SHOW_DEBUG_TOOLS = !!process.env.NEXT_PUBLIC_DEBUG_NOTES_FS;

type Callback = () => void;
export const DirectoryViewButtons: FC<{
  onClickAddNote: undefined | Callback;
  onClickAddDirectory: undefined | Callback;
  onClickDeleteItems: undefined | Callback;
}> = ({ onClickAddNote, onClickAddDirectory, onClickDeleteItems }) => {
  const { selectedItems } = useNotesFS();

  const btnProps: ButtonProps = {
    variant: "faded",
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button
            {...btnProps}
            startContent={<BsFileEarmarkPlus />}
            onClick={onClickAddNote}
          >
            New Note
          </Button>
          <Button
            {...btnProps}
            startContent={<BsFolderPlus />}
            onClick={onClickAddDirectory}
          >
            New Directory
          </Button>
        </div>
        <div>
          <Button
            color="danger"
            isDisabled={!selectedItems}
            onClick={onClickDeleteItems}
          >
            Delete Selected
          </Button>
        </div>
      </div>
      {SHOW_DEBUG_TOOLS ? <DebugButton /> : null}
    </>
  );
};
