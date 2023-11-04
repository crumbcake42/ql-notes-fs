import { useEffect, useState } from "react";

import {
  Breadcrumbs as BreadcrumbsComponent,
  BreadcrumbItem,
} from "@nextui-org/react";

import { useNotesFS } from "../hooks/useNotesFS";
import { Item } from "../types";

export function Breadcrumbs() {
  const { currentItem, setCurrentItem } = useNotesFS();
  const [path, setPath] = useState<Item[]>([]);

  useEffect(() => {
    let item = currentItem;

    const parents = [item];

    while (item.parent) {
      item = item.parent;
      parents.push(item);
    }

    setPath(parents.reverse());
  }, [currentItem]);

  return (
    <BreadcrumbsComponent variant="bordered" separator=" / ">
      {path.map((item, n) => (
        <BreadcrumbItem
          key={`breadcrumb-item-${n}`}
          onPress={() => setCurrentItem(item)}
        >
          {item.name}
        </BreadcrumbItem>
      ))}
    </BreadcrumbsComponent>
  );
}
