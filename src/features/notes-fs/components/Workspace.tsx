import { useCallback } from "react";

import { useNotesFS } from "../hooks/useNotesFS";

import { Breadcrumbs } from "./Breadcrumbs";
import { DirectoryView } from "./DirectoryView";
import { NoteView } from "./NoteView";
import { Button } from "@nextui-org/react";

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
      <div className="flex items-center">
        <Button
          variant="shadow"
          isDisabled={!item.parent}
          size="sm"
          radius="sm"
          className="mr-2"
          onClick={goToEnclosingFolder}
        >
          Previous Directory
        </Button>
        <Breadcrumbs />
      </div>
      {item.type == "directory" && <DirectoryView directory={item} />}
      {item.type == "note" && <NoteView note={item} />}
    </div>
  );
}
