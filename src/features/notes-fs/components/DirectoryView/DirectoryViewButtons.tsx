"use client";

import { FC } from "react";

import { useNotesFS } from "../../hooks/useNotesFS";
import { Button, ButtonProps } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";

export const DirectoryViewButtons: FC = () => {
  const { addNote, addDirectory } = useNotesFS();

  const handleAddNote = () => {
    const fileName = window.prompt("Enter the name of the new note:");
    if (fileName === null) return;
    const noteText = window.prompt("Enter the text of the new note:");
    if (noteText === null) return;
    addNote(fileName, noteText);
  };

  const handleAddDirectory = () => {
    const dirName = window.prompt("Enter the name of the new directory:");
    if (dirName === null) return;
    addDirectory(dirName);
  };

  const btnProps: ButtonProps = {
    color: "primary",
    variant: "faded",
  };

  return (
    <div className="space-x-2">
      <Button
        {...btnProps}
        startContent={<BsFileEarmarkPlus />}
        onClick={handleAddNote}
      >
        New Note
      </Button>
      <Button
        {...btnProps}
        startContent={<BsFolderPlus />}
        onClick={handleAddDirectory}
      >
        New Directory
      </Button>
    </div>
  );
};
