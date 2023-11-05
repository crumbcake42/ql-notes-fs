import { createContext } from "react";
import { Item } from "../types";

import _ from "lodash";
import { makeItem } from "../utils/make-item";

function alertMissingMethod(method: string) {
  return () => {
    throw new Error(
      `Current NotesFS context provider failed to implement required method '${method}'`
    );
  };
}

export interface NotesFSContext {
  currentItem: Item;
  setCurrentItem: (item: Item) => void;
  selectedItems: string[] | null;
  setSelectedItems: (item: string[] | null) => void;
  addNote: (fileName: string, noteText: string) => void;
  addDirectory: (newDirName: string) => void;
  updateNote: (newText: string) => void;
  deleteItems: (namesToRemove: string[]) => void;
}

export const rootItem = makeItem("directory", "Root");

export const NotesFSContext = createContext<NotesFSContext>({
  currentItem: rootItem,
  setCurrentItem: alertMissingMethod("setCurrentItem"),
  selectedItems: null,
  setSelectedItems: alertMissingMethod("setSelectedItem"),
  addNote: alertMissingMethod("addNote"),
  addDirectory: alertMissingMethod("addDirectory"),
  updateNote: alertMissingMethod("updateNote"),
  deleteItems: alertMissingMethod("deleteItems"),
});
