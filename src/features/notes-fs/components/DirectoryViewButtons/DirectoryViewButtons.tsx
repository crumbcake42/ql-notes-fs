"use client";

import { FC } from "react";

import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";
import { AddNoteModal } from "./AddNoteModal";
import { AddDirectoryModal } from "./AddDirectoryModal";

export const DirectoryViewButtons: FC<{ selected: string[] }> = ({
  selected,
}) => {
  const addNoteDisclosure = useDisclosure();
  const addDirectoryDisclosure = useDisclosure();

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
          <Button color="danger" isDisabled={!selected.length}>
            Delete Selected
          </Button>
        </div>
      </div>
      <AddNoteModal {...addNoteDisclosure} />
      <AddDirectoryModal {...addDirectoryDisclosure} />
    </>
  );
};
