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
    <BreadcrumbsComponent
      color="primary"
      variant="bordered"
      separator=" / "
      onAction={(e) => {
        console.log(e);
      }}
    >
      {path.map((item, n) => (
        <BreadcrumbItem key={`breadcrumb-item-${n}`}>
          {item.name}
        </BreadcrumbItem>
      ))}
    </BreadcrumbsComponent>
  );
}
