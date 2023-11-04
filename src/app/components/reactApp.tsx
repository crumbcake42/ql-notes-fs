"use client";

import { NotesFS } from "@/features/notes-fs";

function Header() {
  return (
    <header className="bg-primary text-white p-2 shadow-md">
      <h1>Quilt Labs Notes Filesystem App</h1>
    </header>
  );
}

export default function ReactApp() {
  return (
    <main className="min-h-screen min-w-screen">
      <Header />
      <NotesFS />
    </main>
  );
}
