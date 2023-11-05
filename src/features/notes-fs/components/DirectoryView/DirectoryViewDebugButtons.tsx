"use client";

import { FC, useCallback } from "react";

import { Button, ButtonProps } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";

import { generate } from "random-words";

import { useNotesFS } from "../../hooks/useNotesFS";
import { Directory } from "../../types";

const generateFilename = () =>
  generate({
    min: 1,
    max: 3,
    formatter: (word) => word.slice(0, 1).toUpperCase().concat(word.slice(1)),
    join: " ",
  });

const DirectoryViewDebugButtons: FC<{ directory: Directory }> = ({
  directory,
}) => {
  const { addNote, addDirectory } = useNotesFS();

  const isUniqueName = (name: string) => {
    return !directory.items.some((i) => i.name === name);
  };

  const generateUniqueName = () => {
    let name;
    do {
      name = generateFilename();
    } while (!isUniqueName(name));
    return name;
  };

  const handleGenerateNote = () => {
    const newNoteName = generateUniqueName();
    const newNoteText = generate({ min: 10, max: 100, join: " " });
    addNote(newNoteName, newNoteText);
  };

  const handleGenerateDirectory = () => {
    const newDirName = generateUniqueName();
    addDirectory(newDirName);
  };

  const btnProps: ButtonProps = {
    variant: "bordered",
    size: "sm",
  };

  return (
    <section className="space-x-2">
      <label className="text-sm">Debug tools:</label>
      <Button
        {...btnProps}
        startContent={<BsFileEarmarkPlus />}
        onClick={handleGenerateNote}
      >
        Generate Note
      </Button>
      <Button
        {...btnProps}
        startContent={<BsFolderPlus />}
        onClick={handleGenerateDirectory}
      >
        Generate Directory
      </Button>
    </section>
  );
};

export default function DebugButtons() {
  const { currentItem } = useNotesFS();
  return currentItem.type === "directory" ? (
    <DirectoryViewDebugButtons directory={currentItem} />
  ) : null;
}
