import { FC, KeyboardEventHandler, useState } from "react";

import { Button, Textarea } from "@nextui-org/react";
import { BsPenFill } from "react-icons/bs";
import { Note } from "../../types";
import { useNotesFS } from "../../hooks/useNotesFS";

export const NoteContent: FC<{ note: Note }> = ({ note }) => {
  const { updateNote } = useNotesFS();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.note);

  const handleNoteSubmit = () => {
    if (text == null) {
      alert("Cannot save empty note.");
      return;
    }

    updateNote(text);
    setIsEditing(false);
  };

  const handleKeyPress: KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "Escape":
        setIsEditing(false);
        break;
    }
  };

  return (
    <>
      <div className="space-y-2 relative border-1 border-zinc-50 px-4 py-2 rounded-md mb-4">
        {isEditing ? (
          <>
            <Textarea
              className="bg-background text-foreground rounded-none"
              value={text}
              onValueChange={setText}
              onKeyUp={handleKeyPress}
            />
            <div className="space-x-2 text-right">
              <Button
                variant="bordered"
                color="danger"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleNoteSubmit}>Save</Button>
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              if (!isEditing) {
                setIsEditing(true);
              }
            }}
          >
            <p className="whitespace-pre-line">{text}</p>
          </div>
        )}
      </div>
      {isEditing || (
        <div className="text-right">
          <Button
            variant="ghost"
            color="warning"
            radius="full"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <BsPenFill />
            Edit note content
          </Button>
        </div>
      )}
    </>
  );
};
