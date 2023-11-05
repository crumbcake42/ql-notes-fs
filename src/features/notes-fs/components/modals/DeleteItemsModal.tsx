"use client";

import { FC, Fragment, ReactNode } from "react";
import {
  Button,
  UseDisclosureProps,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ScrollShadow,
} from "@nextui-org/react";

import { BsFileEarmark, BsFolder } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";
import { Directory, Item } from "../../types";
import clsx from "clsx";

const countItems = (
  directory: Directory,
  path: string = ""
): { total: number; flattedItems: [string, string][] } => {
  let total = 0;
  const flattedItems: [string, string][] = [];
  for (const item of directory.items) {
    const itemPath = `${path}/${item.name}`;
    total++;
    flattedItems.push([itemPath, item.type]);
    if (item.type === "directory") {
      const data = countItems(item, itemPath);
      total += data.total;
      flattedItems.push(...data.flattedItems);
    }
  }

  return { total, flattedItems };
};

const RenderItem: FC<{ item: Item; path?: string; depth?: number }> = ({
  item,
  path = "",
  depth = 0,
}) => {
  let children: ReactNode[] = [];

  if (item.type === "directory") {
    const newPath = `${path}/${item.name}`;

    children.push(<div></div>);
    for (const child of item.items)
      children.push(
        <RenderItem
          key={`${newPath}/${child.name}`}
          item={child}
          depth={depth + 1}
        />
      );
  }

  const isDirectory = item.type === "directory";
  const Icon = isDirectory ? BsFolder : BsFileEarmark;

  return (
    <>
      <div className="w-full flex items-center justify-start ">
        <div className={clsx("pr-2", { "text-warning": isDirectory })}>
          <Icon />
        </div>
        <div>
          <span className="whitespace-pre">{"|- - ".repeat(depth)}</span>
          <span>
            {item.name}
            {isDirectory ? " /" : null}
          </span>
        </div>
      </div>
      {children}
    </>
  );
};

export const DeleteItemsModal: FC<UseDisclosureProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentItem, selectedItems, setSelectedItems, deleteItems } =
    useNotesFS();

  const handleSubmit = () => {
    if (selectedItems) {
      deleteItems(selectedItems);
      setSelectedItems(null);
    }
    if (onClose) onClose();
  };

  if (currentItem.type !== "directory")
    throw new Error(
      "DeleteItemsModal should only be rendered in contexts where currentItem is a Directory"
    );

  return (
    <Modal
      size="lg"
      backdrop="blur"
      className="border-danger border-2"
      classNames={{
        base: "border-danger bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        body: "py-6 bg-[#0c0b16] text-[#eeeff6]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              <h1 className="text-danger uppercase">Are you sure?</h1>
              <p className="text-sm">{`You're about to delete all these items`}</p>
            </ModalHeader>
            <ModalBody>
              <div>
                {currentItem.items
                  .filter((item) => selectedItems?.includes(item.name))
                  .map((item) => (
                    <RenderItem key={item.name} item={item} />
                  ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={handleSubmit}>
                Delete all notes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
