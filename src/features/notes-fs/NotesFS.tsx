import { NotesFSContextProvider } from "./providers/NotesFSContextProvider";
import { Workspace } from "./components/Workspace";

export function NotesFS() {
  return (
    <NotesFSContextProvider>
      <Workspace />
    </NotesFSContextProvider>
  );
}
