import { FC, KeyboardEventHandler, useState } from "react";

import { Note } from "../../types";
import { useNotesFS } from "../../hooks/useNotesFS";

import { Button, ButtonGroup, Input, Spacer } from "@nextui-org/react";
import { BsPenFill } from "react-icons/bs";

export const NoteHeader: FC<{
  note: Note;
}> = ({ note }) => {
  const { currentItem, renameItem } = useNotesFS();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(note.name);

  const [error, setError] = useState<string | null>(null);

  const isValidFilename = (name: string): name is string => {
    if (!name?.length) return false;
    return (
      note.name === name ||
      !currentItem.parent?.items.some((i) => i.name === name)
    );
  };

  const validateName = (name?: string | null): name is string => {
    let isValid = false;

    if (!name?.length) {
      setError("Name can't be blank");
    } else if (!isValidFilename(name)) {
      setError(`An item already exists with the name "${name}"`);
    } else {
      setError(null);
      isValid = true;
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValidName = validateName(name);
    if (isValidName) {
      renameItem(name);
      setIsEditing(false);
    }
  };

  const handleKeyPress: KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "Escape":
        setIsEditing(false);
        break;
      case "Enter":
        handleSubmit();
    }
  };

  return (
    <div className="mb-4">
      {isEditing ? (
        <>
          <Input
            autoFocus
            type="text"
            variant="underlined"
            value={name}
            onValueChange={setName}
            onKeyUp={handleKeyPress}
            onBlur={() => {
              const trimmedName = name?.trim();
              setName(trimmedName);
              validateName(trimmedName);
            }}
            endContent={
              <ButtonGroup size="sm" variant="flat">
                <Button onClick={handleSubmit}>Save</Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setName(note.name);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            }
          />
          {error && <span className="text-danger text-sm">{error}</span>}
        </>
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
