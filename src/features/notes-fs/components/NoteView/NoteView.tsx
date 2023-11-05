import { FC } from "react";

import { Note } from "../../types";
import { NoteContent } from "./NoteContent";
import { NoteHeader } from "./NoteHeader";

export const NoteView: FC<{
  note: Note;
}> = ({ note }) => (
  <div className="container px-10">
    <article className=" relative mx-auto my-8 prose prose-zinc dark:prose-invert">
      <NoteHeader note={note} />
      <NoteContent note={note} />
    </article>
  </div>
);
