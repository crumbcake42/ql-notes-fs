import { FC, KeyboardEventHandler, useState } from "react";

import { Note } from "../../types";
import { useNotesFS } from "../../hooks/useNotesFS";

import { Button, Input, Spacer } from "@nextui-org/react";
import { BsPenFill } from "react-icons/bs";

export const NoteHeader: FC<{
  note: Note;
}> = ({ note }) => {
  const { currentItem, renameItem } = useNotesFS();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(note.name);

  const isValidFilename = (name: string | null) => {
    return (
      !name?.length && !currentItem.parent?.items.some((i) => i.name === name)
    );
  };

  const handleNoteSubmit = () => {
    console.log(name);
    if (isValidFilename(name)) {
      alert("Cannot save empty note.");
      return;
    }

    renameItem(name);
    setIsEditing(false);
  };

  const handleKeyPress: KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "Escape":
        setIsEditing(false);
        break;
      case "Enter":
        handleNoteSubmit();
    }
  };

  return (
    <div className="mb-4">
      {isEditing ? (
        <Input
          autoFocus
          type="text"
          variant="underlined"
          value={name}
          onValueChange={setName}
          onKeyUp={handleKeyPress}
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="mb-2 flex items-center"
        >
          <Button
            isIconOnly
            variant="ghost"
            color="warning"
            radius="full"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <BsPenFill />
          </Button>
          <Spacer x={4} />
          {note.name}
        </h1>
      )}
      <span className="flex">
        <small className="text-sm">
          Created: {note.created.toLocaleDateString()}
        </small>
        <Spacer x={4} />
        <small className="text-sm">
          Last updated: {note.created.toLocaleDateString()}
        </small>
      </span>
    </div>
  );
};
