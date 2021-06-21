import { Item } from "../../types";

export const itemList = (): Item[] => {
  return items.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });
};

const items = [
  {
    img: "inventoryElement_1",
    name: "item",
    slot: "body",
    price: 10,
  },
  {
    img: "inventoryElement_2",
    name: "item2",
    slot: "arm",
    price: 10,
  },
];
