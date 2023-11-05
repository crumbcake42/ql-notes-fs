"use client";

import { useEffect, useState } from "react";
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
  useDisclosure,
} from "@nextui-org/react";

import { clsx } from "clsx";
import { BsFileEarmark, BsFolder } from "react-icons/bs";

import { Directory, Item } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { AddNoteModal, AddDirectoryModal, DeleteItemsModal } from "../modals";

import { DirectoryViewButtons } from "./DirectoryViewButtons";
import { ItemActionsCell } from "./ItemActionsCell";
import { RenameItemModal } from "../modals/RenameItemModal";

interface ColProps extends Omit<TableColumnProps<Item>, "children"> {
  label: string;
}

const columns: ColProps[] = [
  {
    key: "actions",
    label: "Actions",
    width: 20,
  },
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
  const addNoteDisclosure = useDisclosure();
  const addDirectoryDisclosure = useDisclosure();
  const deleteItemsDisclosure = useDisclosure();

  const { setCurrentItem, selectedItems, setSelectedItems, sortItems } =
    useNotesFS();

  // Handle selecting items in directory
  const handleItemClick = (name: unknown) => {
    const item = directory.items.find((i) => i.name === name);
    if (item) setCurrentItem(item);
  };

  const handleSelectionChange = (selection: Selection) => {
    let selected: typeof selectedItems;
    if (selection === "all") {
      selected = directory.items.map((i) => i.name);
    } else if (selection.size > 0) {
      selected = Array.from(selection).filter(
        (key): key is string => typeof key === "string"
      );
    } else {
      selected = null;
    }

    setSelectedItems(selected);
  };

  // Handle sorting directory items
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  useEffect(() => {
    if (sortDescriptor) sortItems(sortDescriptor);
  }, [sortItems, sortDescriptor]);

  const handleDeleteSingleItem = (name: string) => {
    setSelectedItems([name]);
    deleteItemsDisclosure.onOpen();
  };

  // Handle renaming items in DirectoryView
  const renameItemDisclosure = useDisclosure();
  const [renameTarget, setRenameTarget] = useState<Item | null>(null);
  const handleRenameItem = (target: Item) => {
    setRenameTarget(target);
  };

  useEffect(() => {
    if (renameTarget) renameItemDisclosure.onOpen();
  }, [renameItemDisclosure, renameTarget]);

  // Clear selectedItems when component unmounts
  useEffect(() => {
    return () => setSelectedItems(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="space-y-4">
        <DirectoryViewButtons
          onClickAddNote={addNoteDisclosure.onOpen}
          onClickAddDirectory={addDirectoryDisclosure.onOpen}
          onClickDeleteItems={deleteItemsDisclosure.onOpen}
        />
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
            {({ key, label, ...props }) => (
              <TableColumn key={key} {...props}>
                {label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={directory.items}
            emptyContent={"Directory is Empty"}
          >
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
                    case "actions":
                      cellContent = (
                        <ItemActionsCell
                          onRenameItem={() => handleRenameItem(item)}
                          onDeleteItem={() => handleDeleteSingleItem(item.name)}
                        />
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
      <AddNoteModal {...addNoteDisclosure} />
      <AddDirectoryModal {...addDirectoryDisclosure} />
      <DeleteItemsModal {...deleteItemsDisclosure} />
      <RenameItemModal
        {...renameItemDisclosure}
        renameTarget={renameTarget}
        onClose={() => {
          setRenameTarget(null);
          renameItemDisclosure.onClose();
        }}
      />
    </>
  );
};
