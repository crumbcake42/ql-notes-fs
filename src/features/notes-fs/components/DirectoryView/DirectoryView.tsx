"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Selection,
} from "@nextui-org/react";
import { BsFileEarmark, BsFolder } from "react-icons/bs";

import { Directory } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { DirectoryViewButtons } from "./DirectoryViewButtons";
import { useEffect } from "react";

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
  const { setCurrentItem, selectedItems, setSelectedItems } = useNotesFS();

  const handleItemClick = (name: unknown) => {
    const item = directory.items.find((i) => i.name === name);
    if (item) setCurrentItem(item);
  };

  const handleSelectionChange = (selection: Selection) => {
    let selected: typeof selectedItems;
    if (selection === "all") selected = directory.items.map((i) => i.name);
    else if (selection.size > 0)
      selected = Array.from(selection).filter(
        (key): key is string => typeof key === "string"
      );
    else selected = null;

    setSelectedItems(selected);
  };

  // Clear selectedItems when component unmounts
  useEffect(() => {
    return () => setSelectedItems(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <DirectoryViewButtons />
      <Table
        className="w-full"
        selectionMode="multiple"
        selectedKeys={new Set(selectedItems)}
        onSelectionChange={handleSelectionChange}
        onRowAction={handleItemClick}
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
