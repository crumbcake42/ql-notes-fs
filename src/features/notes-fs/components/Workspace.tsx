import { useCallback } from "react";

import { useNotesFS } from "../hooks/useNotesFS";

import { NoteView } from "./NoteView";
import { DirectoryView } from "./DirectoryView";

export function Workspace() {
  const { setCurrentItem, currentItem: item } = useNotesFS();

  const goToEnclosingFolder = useCallback(() => {
    if (item.parent == null) {
      alert("Cannot go to enclosing folder.");
      return;
    }

    setCurrentItem(item.parent);
  }, [item, setCurrentItem]);

  return (
    <div>
      <h2>Current Item: {item.name}</h2>
      <h3>Type: {item.type}</h3>
      <div>
        {item.parent != null && (
          <button onClick={goToEnclosingFolder}>Previous Directory</button>
        )}
        {item.type == "directory" && <DirectoryView directory={item} />}
        {item.type == "note" && <NoteView note={item} />}
      </div>
    </div>
  );
}
