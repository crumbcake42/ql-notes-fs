"use client";

import { FC } from "react";

import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";

import { AddNoteModal, AddDirectoryModal, DeleteItemsModal } from "../modals";

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
      <AddNoteModal {...addNoteDisclosure} />
      <AddDirectoryModal {...addDirectoryDisclosure} />
      <DeleteItemsModal {...deleteItemsDisclosure} />
    </>
  );
};
