"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";

import { AddNoteModal, AddDirectoryModal, DeleteItemsModal } from "../modals";

const DebugButton = dynamic(() => import("./DirectoryViewDebugButtons"), {
  ssr: false,
});

const SHOW_DEBUG_TOOLS = !!process.env.NEXT_PUBLIC_DEBUG_NOTES_FS;

export const DirectoryViewButtons: FC = () => {
  const { selectedItems } = useNotesFS();
  const addNoteDisclosure = useDisclosure();
  const addDirectoryDisclosure = useDisclosure();
  const deleteItemsDisclosure = useDisclosure();

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
            onClick={addNoteDisclosure.onOpen}
          >
            New Note
          </Button>
          <Button
            {...btnProps}
            startContent={<BsFolderPlus />}
            onClick={addDirectoryDisclosure.onOpen}
          >
            New Directory
          </Button>
        </div>
        <div>
          <Button
            color="danger"
            isDisabled={!selectedItems}
            onClick={deleteItemsDisclosure.onOpen}
          >
            Delete Selected
          </Button>
        </div>
      </div>
      {SHOW_DEBUG_TOOLS ? <DebugButton /> : null}
      <AddNoteModal {...addNoteDisclosure} />
      <AddDirectoryModal {...addDirectoryDisclosure} />
      <DeleteItemsModal {...deleteItemsDisclosure} />
    </>
  );
};
