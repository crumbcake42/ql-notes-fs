import { Item } from "../types";
import { NotesFSContext, rootItem } from "./NotesFSContext";
import React, { FC, PropsWithChildren, useState, useCallback } from "react";
import _ from "lodash";
import { makeItem } from "../utils/make-item";

export const NotesFSContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState<Item>(rootItem);
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null);

  console.log(currentItem);
  const addNote = useCallback((fileName: string, noteText: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === "directory") {
        const newNote = makeItem("note", fileName, noteText);
        newNote.parent = newItem;
        newItem.items = newItem.items ? [...newItem.items, newNote] : [newNote];
      }
      return newItem;
    });
  }, []);

  const addDirectory = useCallback((newDirName: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === "directory") {
        const newDir = makeItem("directory", newDirName);
        newDir.parent = newItem;
        newItem.items = newItem.items ? [...newItem.items, newDir] : [newDir];
      }
      return newItem;
    });
  }, []);

  const deleteItems = useCallback((namesToRemove: string[]) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);

      if (newItem.type === "directory") {
        newItem.items = newItem.items.filter(
          (item) => !namesToRemove.includes(item.name)
        );
      }

      return newItem;
    });
  }, []);

  const updateNote = useCallback((newText: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === "note") {
        newItem.note = newText;
      }
      return newItem;
    });
  }, []);

  return (
    <NotesFSContext.Provider
      value={{
        currentItem,
        setCurrentItem,
        selectedItems,
        setSelectedItems,
        addNote,
        addDirectory,
        updateNote,
        deleteItems,
      }}
    >
      {children}
    </NotesFSContext.Provider>
  );
};
