import { Item } from "../../types";

export const itemList = (): Item[] => {
  return items.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });
};

const items: Item[] = [
  {
    img: "inventoryElement_1",
    name: "item",
    slot: "body",
    price: 10,
    params: {
      defence: 20,
      attack: 10,
      hp: 5,
      speed: 50,
    },
  },
  {
    img: "inventoryElement_2",
    name: "item2",
    slot: "arm",
    price: 10,
    params: {
      defence: 0,
      attack: 150,
      hp: 0,
      speed: 510,
    },
  },
];
