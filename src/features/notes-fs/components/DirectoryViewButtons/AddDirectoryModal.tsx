"use client";

import { FC, useState } from "react";

import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
import { BsFileEarmarkPlus, BsFolderPlus } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";

import { AddItemModal, BaseAddItemModalProps } from "./AddItemModal";
import { InputFilename } from "./InputFilename";

export const AddDirectoryModal: FC<BaseAddItemModalProps> = (props) => {
  const { addDirectory } = useNotesFS();

  const [filename, setFilename] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const onClose = () => {
    setFilename("");
    if (props.onClose) props.onClose();
  };

  const handleSubmit = () => {
    if (error) return;
    addDirectory(filename);
    onClose();
  };

  return (
    <AddItemModal
      {...props}
      header="Add a new directory"
      canSubmit={!error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <InputFilename
        filename={filename}
        setFilename={setFilename}
        error={error}
        setError={setError}
      />
    </AddItemModal>
  );
};
