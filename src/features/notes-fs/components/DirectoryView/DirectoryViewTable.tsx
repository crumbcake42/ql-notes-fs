"use client";

import React from "react";
import { Directory, Item } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { DirectoryViewButtons } from "./DirectoryViewButtons";

interface DirectoryViewProps {
  directory: Directory;
}

export const DirectoryViewTable: React.FC<DirectoryViewProps> = ({
  directory,
}) => {
  const { setCurrentItem } = useNotesFS();

  const handleItemClick = (item: Item) => {
    setCurrentItem(item);
  };

  return (
    <div className="space-x-2">
      <DirectoryViewButtons />
      <table>
        <tbody>
          {directory.items.map((childItem, index) => (
            <tr key={index} onClick={() => handleItemClick(childItem)}>
              <td>{childItem.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
