"use client";

import { FC, Fragment, ReactNode, useEffect } from "react";
import {
  Button,
  UseDisclosureProps,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import clsx from "clsx";

import { BsFileEarmark, BsFolder } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";
import { Directory, Item } from "../../types";

const countItems = (directory: Directory): number => {
  let total = 0;
  for (const item of directory.items) {
    total++;
    if (item.type === "directory") total += countItems(item);
  }

  return total;
};

const RenderItem: FC<{ item: Item; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  let children: ReactNode[] = [];

  if (item.type === "directory") {
    for (const child of item.items)
      children.push(
        <RenderItem
          key={`${depth}/${item.name}/${child.name}`}
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
  ...props
}) => {
  const { currentItem, selectedItems, setSelectedItems, deleteItems } =
    useNotesFS();

  if (currentItem.type !== "directory")
    throw new Error(
      "DeleteItemsModal should only be rendered in contexts where currentItem is a Directory"
    );

  const onClose = () => {
    setSelectedItems(null);
    if (props.onClose) props.onClose();
  };

  const handleSubmit = () => {
    if (selectedItems) deleteItems(selectedItems);
    onClose();
  };

  const items = currentItem.items.filter((item) =>
    selectedItems?.includes(item.name)
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
                {items.map((item) => (
                  <RenderItem key={item.name} item={item} />
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={handleSubmit}>
                Delete{" "}
                {[
                  items.reduce(
                    (total, item) =>
                      total +
                      1 +
                      (item.type === "directory" ? countItems(item) : 0),
                    0
                  ),
                ]}{" "}
                items
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
