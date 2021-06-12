import { Scene } from "phaser";
import {
  InventoryParams,
  CreateInventorySettings,
  InventoryStatuses,
} from "../types";

export function createInventory(
  this: Scene,
  settings?: CreateInventorySettings
): Inventory {
  return new Inventory(this, settings);
}

export default class Inventory {
  scene: Scene;
  elements: InventoryParams;
  list = {};
  inventoryStatus: InventoryStatuses = "close";

  constructor(scene: Scene, settings?: CreateInventorySettings) {
    this.scene = scene;

    const sceneSizes = {
        w: Number(scene.game.config.width),
        h: Number(scene.game.config.height),
      },
      margin = 15,
      container = scene.add.container(0, 0),
      shape = scene.make.graphics({}),
      mask = shape.createGeometryMask(),
      background = scene.add
        .sprite(sceneSizes.w / 2, sceneSizes.h / 2, "inventoryBG")
        .setOrigin(0.5);
    shape
      .fillRect(
        margin, //start x
        margin, //start y
        sceneSizes.w - margin * 2, //width
        sceneSizes.h - margin * 2 //height
      )
      .setScrollFactor(0);

    container.add([background]).setMask(mask).setAlpha(0).setScrollFactor(0);

    this.elements = {
      background,
      container,
      mask,
    };

    if (settings) {
      const { playerInv } = settings;

      if (playerInv) {
        this.elements.uiButton = scene.add.sprite(
          sceneSizes.w,
          0,
          playerInv.img
        );
        this.elements.uiButton
          .setOrigin(1, 0)
          .setScrollFactor(0)
          .setInteractive();

        this.elements.uiButton.on("pointerdown", () => {
          switch (this.inventoryStatus) {
            case "close":
              this.openInventory();
              break;

            case "open":
            case "barter":
              this.closeInventory();
              break;

            default:
              break;
          }
        });
      }
    }
  }

  getListLength() {
    return Object.keys(this.list).length;
  }
  openInventory() {
    this.inventoryStatus = "open";
    this.elements.container.setAlpha(1);
  }
  closeInventory() {
    this.inventoryStatus = "close";
    this.elements.container.setAlpha(0);
  }
}
