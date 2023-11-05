import _ from "lodash";
import { Directory, Item, ItemType, Note } from "../types";

export function makeItem(type: "directory", name: string): Directory;
export function makeItem(type: "note", name: string, note: string): Note;
export function makeItem<T extends ItemType>(
  type: T,
  name: string,
  note?: T extends "note" ? string : never
): Item {
  const created = new Date();
  const itemBase: Pick<Item, "name" | "slug" | "created" | "lastUpdated"> = {
    name,
    slug: _.kebabCase(name),
    created,
    lastUpdated: created
  };

  if (type === "directory") return { type, ...itemBase, items: [] as Item[] };
  else return { type, ...itemBase, note: note || "" };
}
