import { useContext } from "react";
import { NotesFSContext } from "../providers/NotesFSContext";

export const useNotesFS = () => {
  const context = useContext(NotesFSContext);
  return context;
};
