"use client";

import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import {
  Button,
  UseDisclosureProps,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
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
interface RenameItemModal extends UseDisclosureProps {
  renameTarget: Item | null;
}
export const RenameItemModal: FC<RenameItemModal> = ({
  isOpen,
  onClose,
  renameTarget,
}) => {
  const { currentItem, renameItem } = useNotesFS();
  const [newName, setNewName] = useState(renameTarget?.name);
  const [error, setError] = useState<string | null>(null);
  if (currentItem.type !== "directory")
    throw new Error(
      "RenameItemModal should only be rendered in contexts where currentItem is a Directory"
    );

  const isValidFilename = (name: string): name is string => {
    if (!name?.length) return false;
    return (
      renameTarget?.name === name ||
      !currentItem.items.some((i) => i.name === name)
    );
  };

  const validateName = (name?: string | null): name is string => {
    let isValid = false;

    if (!name?.length) {
      setError("Name can't be blank");
    } else if (!isValidFilename(name)) {
      setError(`An item already exists with the name "${name}"`);
    } else {
      setError(null);
      isValid = true;
    }

    return isValid;
  };

  const handleSubmit = () => {
    const prevName = renameTarget?.name;
    if (!prevName) return;

    const isValidName = validateName(newName);
    if (isValidName && prevName) renameItem(newName, prevName);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (renameTarget) setNewName(renameTarget.name);
  }, [renameTarget]);

  return (
    <Modal size="md" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              <h1>
                Rename <span className="capitalize">{renameTarget?.type}</span>{" "}
                {`"${renameTarget?.name}"`}
              </h1>
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                type="text"
                label=""
                value={newName}
                onValueChange={setNewName}
                onFocus={() => setError(null)}
                onBlur={() => {
                  const trimmedName = newName?.trim();
                  setNewName(trimmedName);
                  validateName(trimmedName);
                }}
                isInvalid={error !== null}
                onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
              />
              {error && <span className="text-danger text-sm">{error}</span>}
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button className="grow" color="primary" onPress={handleSubmit}>
                Rename <span className="capitalize">{renameTarget?.type}</span>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
