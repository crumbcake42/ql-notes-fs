"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { BsFileEarmark, BsFolder } from "react-icons/bs";

import { Directory, Item } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { DirectoryViewButtons } from "./DirectoryViewButtons";

interface DirectoryViewProps {
  directory: Directory;
}

const columns = [
  {
    key: "name",
    label: "Filename",
    allowsSorting: true,
  },
  {
    key: "slug",
    label: "Slug",
  },
  {
    key: "type",
    label: "Type",
    allowsSorting: true,
  },
];

export const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const { setCurrentItem } = useNotesFS();

  const handleItemClick = (name: string) => {
    const item = directory.items.find((i) => i.name === name);
    console.log({ name, item });
    if (item) setCurrentItem(item);
  };

  return (
    <div className="space-y-2">
      <DirectoryViewButtons />
      <Table
        className="w-full"
        selectionMode="multiple"
        onRowAction={(key) => {
          if (typeof key === "string") handleItemClick(key);
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={directory.items} emptyContent={"Directory is Empty"}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => {
                let cellContent = getKeyValue(item, columnKey);

                switch (columnKey) {
                  case "name":
                    const Icon =
                      item.type === "directory" ? BsFolder : BsFileEarmark;

                    cellContent = (
                      <div className="flex items-center space-x-4">
                        <Icon />
                        <span>{cellContent}</span>
                      </div>
                    );
                    break;

                  case "type":
                    cellContent = (
                      <div className="capitalize">{cellContent}</div>
                    );
                    break;
                }

                return <TableCell>{cellContent}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
