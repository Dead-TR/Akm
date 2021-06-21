import { Scene } from "phaser";
import { Inventory } from "../../../../game/create";

export const boxCreator = (scene: Scene, inventory: Inventory) => {
  const box = inventory.createBox(300, 100, "inventoryBox", {
    random: 2,
  });
};
