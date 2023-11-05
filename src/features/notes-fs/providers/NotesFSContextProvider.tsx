import { Item } from "../types";
import { NotesFSContext, rootItem } from "./NotesFSContext";
import React, { FC, PropsWithChildren, useState, useCallback } from "react";
import _ from "lodash";
import { makeItem } from "../utils/make-item";
import { SortDescriptor } from "@nextui-org/react";

export const NotesFSContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState<Item>(rootItem);
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null);

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

  const sortItems = useCallback(({ column, direction }: SortDescriptor) => {
    const isItemKey = (key: unknown): key is keyof Item =>
      typeof key === "string" &&
      ["type", "name", "slug", "parent"].includes(key);

    if (!isItemKey(column)) return;

    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);

      if (newItem.type === "directory") {
        newItem.items = newItem.items.sort((a, b) => {
          let cmp = (a[column] || -1) < (b[column] || -1) ? -1 : 1;

          if (direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        });
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

  const renameItem = useCallback((newName: string, target?: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      // If we're in DirectoryView and renaming a target item, update the dir items as needed
      if (target && newItem.type === "directory") {
        newItem.items = newItem.items.map((i) => {
          if (i.name === target) {
            i.name = newName;
            i.lastUpdated = new Date();
          }
          return i;
        });
      }
      // Otherwise just rename currentItem
      else {
        newItem.name = newName;
      }

      newItem.lastUpdated = new Date();
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
        sortItems,
        deleteItems,
        updateNote,
        renameItem,
      }}
    >
      {children}
    </NotesFSContext.Provider>
  );
};
