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
  Button,
  ButtonGroup,
  useDisclosure,
} from "@nextui-org/react";

import { clsx } from "clsx";
import {
  BsFileEarmark,
  BsFillTrashFill,
  BsFolder,
  BsPenFill,
} from "react-icons/bs";

import { Directory, Item } from "../../types";

import { useNotesFS } from "../../hooks/useNotesFS";
import { AddNoteModal, AddDirectoryModal, DeleteItemsModal } from "../modals";

import { DirectoryViewButtons } from "./DirectoryViewButtons";

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

const ItemActions: React.FC<{
  onRenameItem: () => void;
  onDeleteItem: () => void;
}> = ({ onRenameItem, onDeleteItem }) => {
  const { selectedItems } = useNotesFS();
  return (
    <ButtonGroup size="sm" variant="light" radius="none">
      <Button
        isIconOnly
        isDisabled={!!selectedItems}
        color="warning"
        onClick={onRenameItem}
      >
        <BsPenFill />
      </Button>
      <Button
        isIconOnly
        isDisabled={!!selectedItems}
        color="danger"
        onClick={onDeleteItem}
      >
        <BsFillTrashFill />
      </Button>
    </ButtonGroup>
  );
};

export const DirectoryView: React.FC<{
  directory: Directory;
}> = ({ directory }) => {
  const addNoteDisclosure = useDisclosure();
  const addDirectoryDisclosure = useDisclosure();
  const deleteItemsDisclosure = useDisclosure();

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { setCurrentItem, selectedItems, setSelectedItems, sortItems } =
    useNotesFS();

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

  // Clear selectedItems when component unmounts
  useEffect(() => {
    return () => setSelectedItems(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sortDescriptor) sortItems(sortDescriptor);
  }, [sortItems, sortDescriptor]);

  const handleDeleteSingleItem = (name: string) => {
    setSelectedItems([name]);
    deleteItemsDisclosure.onOpen();
  };

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
                        <ItemActions
                          onRenameItem={() => console.log("renameItem")}
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
    </>
  );
};
