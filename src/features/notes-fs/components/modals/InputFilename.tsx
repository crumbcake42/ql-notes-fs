"use client";

import { FC, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { useNotesFS } from "../../hooks/useNotesFS";

export const InputFilename: FC<{
  filename: string;
  setFilename: (value: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}> = ({ filename, setFilename, error, setError }) => {
  const { currentItem } = useNotesFS();
  const isValidName = useCallback(
    (filename: string) =>
      currentItem.type === "directory" &&
      !currentItem.items.some((item) => item.name === filename),
    [currentItem]
  );

  const validateFilename = () => {
    const name = filename.trim();
    setFilename(name);
    if (!name.length) {
      setError("Filename name cannot be blank");
    } else if (!isValidName(name)) {
      setError(`Name '${name}' already taken`);
    } else {
      setError(null);
    }
  };

  return (
    <>
      <Input
        autoFocus
        isRequired
        type="text"
        label="Name"
        variant="bordered"
        onFocus={() => setError(null)}
        onBlur={validateFilename}
        isInvalid={!!error}
        value={filename}
        onValueChange={setFilename}
      />
      {error && (
        <small className="text-danger text-xs text-right">{error}</small>
      )}
    </>
  );
};
