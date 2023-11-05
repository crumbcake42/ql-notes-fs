"use client";

import { FC, useState } from "react";
import { Textarea } from "@nextui-org/react";

import { useNotesFS } from "../../hooks/useNotesFS";
import { AddItemModal, BaseAddItemModalProps } from "./AddItemModal";
import { InputFilename } from "./InputFilename";

export const AddNoteModal: FC<BaseAddItemModalProps> = (props) => {
  const { addNote } = useNotesFS();

  const [filename, setFilename] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const onClose = () => {
    setFilename("");
    setNoteText("");
    if (props.onClose) props.onClose();
  };

  const handleSubmit = () => {
    if (error) return;
    addNote(filename, noteText);
    onClose();
  };

  return (
    <AddItemModal
      {...props}
      header="Add a new note"
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
      <Textarea
        label="Content"
        variant="bordered"
        value={noteText}
        onValueChange={setNoteText}
      />
    </AddItemModal>
  );
};
