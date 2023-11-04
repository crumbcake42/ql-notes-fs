import { useCallback } from "react";

import { useNotesFS } from "../hooks/useNotesFS";

import { Breadcrumbs } from "./Breadcrumbs";
import { DirectoryView } from "./DirectoryView";
import { NoteView } from "./NoteView";

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
    <div className="container mx-auto space-y-2 py-4">
      <Breadcrumbs />
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
