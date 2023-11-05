"use client";

import { Button, ButtonGroup } from "@nextui-org/react";

import { BsFillTrashFill, BsPenFill } from "react-icons/bs";

import { useNotesFS } from "../../hooks/useNotesFS";
export const ItemActionsCell: React.FC<{
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
