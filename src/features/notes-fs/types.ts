export type ItemType = "note" | "directory";

interface ItemBase<T extends ItemType> {
  type: T;
  name: string;
  slug: string;
  parent?: Directory;
  created: Date;
  lastUpdated: Date;
}

export interface Directory extends ItemBase<"directory"> {
  items: Item[];
}

export interface Note extends ItemBase<"note"> {
  note: string;
}

export type Item = Directory | Note;
