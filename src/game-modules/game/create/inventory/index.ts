import { Math as PhaserMath, Scene } from "phaser";
import {
  InventoryParams,
  CreateInventorySettings,
  InventoryStatuses,
  Item,
  ItemBox,
  ItemBody,
} from "../../types";
import { itemList } from "./allItemList";
import { createCells } from "./createCell";
import { clearItems, createItems } from "./createItems";
import DefaultScene from "../../../service/scenes/DefaultScene";
import { createButton } from "./createButton";

export function createInventory(
  this: DefaultScene,
  params: CreateInventorySettings
): Inventory {
  return new Inventory(this, params);
}

export default class Inventory {
  scene: DefaultScene;
  elements: InventoryParams;
  list: Item[] = [];
  inventoryStatus: InventoryStatuses = "close";
  allItems = itemList();

  cells: Phaser.GameObjects.Graphics[];
  inventoryContainer: Phaser.GameObjects.Container;
  displayedItems: ItemBody[];
  barterButton: Phaser.GameObjects.Sprite;

  constructor(scene: DefaultScene, params: CreateInventorySettings) {
    this.scene = scene;
    this.list[0] = this.list[1] = this.list[2] = this.allItems[0];
    this.inventoryContainer = scene.add.container(0, 0);

    const sceneSizes = {
        w: Number(scene.game.config.width),
        h: Number(scene.game.config.height),
      },
      margin = 15,
      shape = scene.make.graphics({}),
      mask = shape.createGeometryMask(),
      container = this.inventoryContainer,
      background = scene.add
        .sprite(sceneSizes.w / 2, sceneSizes.h / 2, "inventoryBG")
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => null);

    this.cells = createCells(scene);
    this.barterButton = createButton(scene).setAlpha(0);

    shape
      .fillRect(
        margin, //start x
        margin, //start y
        sceneSizes.w - margin * 2, //width
        sceneSizes.h - margin * 2 //height
      )
      .setScrollFactor(0);

    container
      .add([background, ...this.cells])
      .setMask(mask)
      .setAlpha(0)
      .setScrollFactor(0);

    this.elements = {
      background,
      container,
      mask,
    };

    this.elements.uiButton = scene.add.sprite(sceneSizes.w, 0, params.img);
    this.elements.uiButton.setOrigin(1, 0).setScrollFactor(0).setInteractive();

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

  openInventory() {
    this.inventoryStatus = "open";
    this.displayedItems = createItems(this.scene, this.cells, this.list);
    this.inventoryContainer.add([...this.displayedItems]);

    this.elements.container.setAlpha(1);
  }
  openBarter(list: Item[]) {
    this.inventoryStatus = "barter";
    this.displayedItems = createItems(this.scene, this.cells, list);
    this.barterButton.setAlpha(1);
    this.barterButton.setDepth(this.inventoryContainer.length).on(
      "pointerup",
      (this.scene,
      () => {
        console.log("click");

        clearItems(this.displayedItems);
        this.displayedItems = createItems(this.scene, this.cells, this.list);
        this.inventoryContainer.add([...this.displayedItems]);
      })
    );

    // this.barterButton =
    //   .setOrigin(0.5)
    // .setInteractive()
    this.inventoryContainer.add([...this.displayedItems]);
    this.elements.container.setAlpha(1);
  }
  closeInventory() {
    this.inventoryStatus = "close";
    clearItems(this.displayedItems);
    this.barterButton.setAlpha(0);

    // if (this.barterButton) {
    //   this.barterButton.destroy();
    // }
    this.elements.container.setAlpha(0);
  }

  createBox(
    x: number,
    y: number,
    img: string,
    params?: { random?: number; search?: number[] }
  ): ItemBox {
    const list: Item[] = [];
    if (params) {
      const { random, search } = params;
      if (random) {
        for (let index = 0; index < random; index++) {
          const item =
            this.allItems[PhaserMath.Between(0, this.allItems.length - 1)];
          list.push(item);
        }
      }

      if (search) {
        search.forEach((id) => {
          const item = this.allItems[id];
          list.push(item);
        });
      }
    }

    const inventoryImg = this.scene.add
      .sprite(x, y, img)
      .setInteractive()
      .on("pointerdown", () => {
        const pointerDistance = 60;

        if (
          Math.abs(this.scene.player.actor.x - inventoryImg.x) <
            pointerDistance &&
          Math.abs(this.scene.player.actor.y - inventoryImg.y) <
            pointerDistance &&
          !this.scene.player.mortal.enemy
        )
          this.openBarter(list);
      });

    return { img: inventoryImg, list };
  }
}
