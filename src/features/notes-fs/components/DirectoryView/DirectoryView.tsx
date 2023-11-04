"use client";

import React from "react";
import { Directory, Item } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { DirectoryViewButtons } from "./DirectoryViewButtons";
import { DirectoryViewEmpty } from "./DirectoryViewEmpty";
import { DirectoryViewTable } from "./DirectoryViewTable";

interface DirectoryViewProps {
  directory: Directory;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  return (
    <div>
      {directory.items.length > 0 ? (
        <DirectoryViewTable directory={directory} />
      ) : (
        <DirectoryViewEmpty />
      )}
    </div>
  );
};
