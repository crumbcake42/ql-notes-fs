"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Selection,
  TableColumnProps,
  SortDescriptor,
} from "@nextui-org/react";

import { clsx } from "clsx";
import { BsFileEarmark, BsFolder } from "react-icons/bs";

import { Directory, Item } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { DirectoryViewButtons } from "./DirectoryViewButtons";

interface ColProps extends Omit<TableColumnProps<Item>, "children"> {
  label: string;
}

const columns: ColProps[] = [
  {
    key: "type",
    label: "Type",
    allowsSorting: true,
    width: 20,
  },
  {
    key: "name",
    label: "Filename",
    allowsSorting: true,
  },
];

export const DirectoryView: React.FC<{
  directory: Directory;
}> = ({ directory }) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { setCurrentItem, selectedItems, setSelectedItems, sortItems } =
    useNotesFS();

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

  useEffect(() => {
    console.log(sortDescriptor);
    if (sortDescriptor) sortItems(sortDescriptor);
  }, [sortItems, sortDescriptor]);

  return (
    <div className="space-y-2">
      <DirectoryViewButtons />
      <Table
        isCompact={false}
        className="w-full"
        selectionMode="multiple"
        selectedKeys={new Set(selectedItems)}
        onSelectionChange={handleSelectionChange}
        onRowAction={handleItemClick}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{ th: "first:w-4", td: "first:w-4" }}
      >
        <TableHeader columns={columns}>
          {({ key, label, ...props }) => {
            return (
              <TableColumn key={key} {...props}>
                {label}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody items={directory.items} emptyContent={"Directory is Empty"}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => {
                let cellContent;

                switch (columnKey) {
                  case "type":
                    const styles = "mx-auto";
                    cellContent =
                      item.type === "directory" ? (
                        <BsFolder className={clsx(styles, "text-warning")} />
                      ) : (
                        <BsFileEarmark className={styles} />
                      );
                    break;
                  default:
                    cellContent = getKeyValue(item, columnKey);
                }

                return (
                  <TableCell
                    className={clsx({ "text-center": columnKey === "type" })}
                  >
                    {cellContent}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
