"use client";

import { FC } from "react";

import {
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import { useNotesFS } from "../../hooks/useNotesFS";
import { DirectoryViewButtons } from "./DirectoryViewButtons";

export const DirectoryViewEmpty: FC = () => {
  const { currentItem } = useNotesFS();
  return (
    <Card className="container mx-auto">
      <CardHeader className="flex gap-3">
        <p className="text-xl">Directory is Empty</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-md text-center">
          Use buttons below to add new items to{" "}
          <strong>{currentItem.name}</strong>
        </p>
      </CardBody>
      <CardFooter className="flex justify-center">
        <DirectoryViewButtons />
      </CardFooter>
    </Card>
  );
};
