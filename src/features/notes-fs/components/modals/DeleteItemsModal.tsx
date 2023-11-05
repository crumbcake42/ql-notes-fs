"use client";

import { FC, ReactNode } from "react";
import {
  Button,
  UseDisclosureProps,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { useNotesFS } from "../../hooks/useNotesFS";
import { Item } from "../../types";

const RenderItem: FC<{ item: Item; path?: string }> = ({ item, path = "" }) => {
  let children: ReactNode[] = [];

  if (item.type === "directory") {
    for (const child of item.items) {
      children.push(<RenderItem item={child} path={`${path}/${item.name}`} />);
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span>{`${path}/${item.name}`}</span>
        <small className="text-capitalize">({item.type})</small>
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
      size="md"
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
