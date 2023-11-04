import React, { useState } from "react";

import { Note } from "../../types";
import { useNotesFS } from "../../hooks/useNotesFS";

interface NoteViewProps {
  note: Note;
}

export const NoteView: React.FC<NoteViewProps> = ({ note }) => {
  const { updateNote } = useNotesFS();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.note);

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleNoteSubmit = () => {
    if (text == null) {
      alert("Cannot save empty note.");
      return;
    }

    updateNote(text);
    setIsEditing(false);
  };

  return (
    <div
      className="noteSection"
      onClick={() => {
        if (!isEditing) {
          setIsEditing(true);
        }
      }}
    >
      {isEditing ? (
        <div>
          <input type="text" value={text} onChange={handleNoteChange} />
          <button onClick={handleNoteSubmit}>Save</button>
        </div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};
