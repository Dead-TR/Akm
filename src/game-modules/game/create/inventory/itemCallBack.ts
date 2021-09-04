import { paramTextYPosition } from "../../consts";
import { ItemBody, ItemParams } from "../../types";
import { clearParams } from "./clearParamsName";
import Inventory from "./index";

const setText = (paramName: keyof ItemParams, value: number) => {
  switch (paramName) {
    case "attack":
      return `attack: ${value}`;
    case "defence":
      return `defence: ${value}`;
    case "hp":
      return `hp: ${value}`;
    case "speed":
      return `speed: ${value}`;

    default:
      return "";
  }
};

export function itemCallBack(this: Inventory, item: ItemBody | null) {
  this.checkedItem = item;
  if (item) {
    this.frame.setPosition(item?.x, item.y);
    const { params } = item.params;

    if (params) {
      clearParams(this.showItemParamElements);
      //@ts-ignore
      const paramsArray: [keyof ItemParams, number][] = Object.entries(params);
      let counter = 1;

      paramsArray.forEach((unit) => {
        if (unit && unit[1]) {
          const [name, value] = unit;
          const paramName: keyof ItemParams = name;
          const element = this.showItemParamElements[paramName];
          if (element) {
            element.y = paramTextYPosition + element.height * counter++;
            element.setText(setText(paramName, value));
          }
        }
      });
    }
  }
}
