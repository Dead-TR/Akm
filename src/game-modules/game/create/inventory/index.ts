import { Math as PhaserMath, Scene } from "phaser";
import {
  InventoryParams,
  CreateInventorySettings,
  InventoryStatuses,
  Item,
  ItemBox,
  ItemBody,
  ShowItemParamElements,
} from "../../types";
import { itemList } from "./allItemList";
import { createCells } from "./createCell";
import { clearItems, createItems } from "./createItems";
import DefaultScene from "../../../service/scenes/DefaultScene";
import { createButton } from "./createButton";
import { itemCallBack } from "./itemCallBack";
import { paramTextYPosition } from "../../consts";
import { clearParams } from "./clearParamsName";

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
  checkedItem: ItemBody | null = null;
  showItemParamElements: ShowItemParamElements;
  frame: Phaser.GameObjects.Sprite;
  inventoryStatus: InventoryStatuses = "close";
  allItems = itemList();

  cells: Phaser.GameObjects.Graphics[];
  inventoryContainer: Phaser.GameObjects.Container;
  displayedItems: ItemBody[];

  barterButton: Phaser.GameObjects.Sprite | null = null;
  barterMoveButton: Phaser.GameObjects.Sprite | null = null;

  constructor(scene: DefaultScene, params: CreateInventorySettings) {
    const { width, height } = scene.game.config;
    this.scene = scene;
    this.list[0] = this.list[1] = this.list[2] = this.allItems[0];
    this.inventoryContainer = scene.add.container(0, 0).setScrollFactor(0);
    this.frame = scene.add.sprite(-100, -100, "frame").setOrigin(0, 0);

    const sceneSizes = {
      w: Number(width),
      h: Number(height),
    };

    const createShowItemParamElements = () => {
      const elementNames: (keyof ShowItemParamElements)[] = [
        "defence",
        "attack",
        "speed",
        "hp",
      ];
      const elements: ShowItemParamElements = {};

      elementNames.forEach((name) => {
        const element = scene.add
          .text(sceneSizes.w - 30, paramTextYPosition, "")
          .setOrigin(1, 0.5);
        elements[name] = element;
      });

      return elements;
    };

    this.showItemParamElements = createShowItemParamElements();

    const margin = 15,
      shape = scene.make.graphics({}),
      mask = shape.createGeometryMask(),
      container = this.inventoryContainer,
      background = scene.add
        .sprite(sceneSizes.w / 2, sceneSizes.h / 2, "inventoryBG")
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => null);

    this.cells = createCells(scene);

    shape
      .fillRect(
        margin, //start x
        margin, //start y
        sceneSizes.w - margin * 2, //width
        sceneSizes.h - margin * 2 //height
      )
      .setScrollFactor(0);

    const paramsElements: Phaser.GameObjects.Text[] = Object.values(
      this.showItemParamElements
    );
    container
      .add([
        background,
        ...this.cells,
        ...paramsElements,
        this.frame,
        //  defence, attack, speed, hp
      ])
      .setMask(mask)
      .setAlpha(0);

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

    this.displayedItems = createItems(
      this.scene,
      this.cells,
      this.list,
      itemCallBack.bind(this)
    );
    this.inventoryContainer.add([...this.displayedItems]);

    this.elements.container.setAlpha(1);
  }
  openBarter(list: Item[], changeList: (newList: Item[]) => void) {
    this.elements.uiButton?.setTexture("uiInventoryBox");

    let barterShowedElements: "box" | "player" = "box";
    this.inventoryStatus = "barter";
    this.displayedItems = createItems(
      this.scene,
      this.cells,
      list,
      itemCallBack.bind(this)
    );

    this.barterButton = createButton(this.scene, "open").setAlpha(1);
    this.barterMoveButton = createButton(this.scene, "move").setAlpha(1);

    this.barterButton.setDepth(this.inventoryContainer.length).on(
      "pointerup",
      (this.scene,
      () => {
        this.checkedItem = null;
        clearParams(this.showItemParamElements);
        this.frame.setPosition(-100, -100);

        switch (barterShowedElements) {
          case "player":
            this.elements.uiButton?.setTexture("uiInventoryBox");

            clearItems(this.displayedItems);
            this.displayedItems = createItems(
              this.scene,
              this.cells,
              list,
              itemCallBack.bind(this)
            );
            this.inventoryContainer.add([...this.displayedItems]);
            barterShowedElements = "box";
            break;

          case "box":
            this.elements.uiButton?.setTexture("uiInventory");

            clearItems(this.displayedItems);
            this.displayedItems = createItems(
              this.scene,
              this.cells,
              this.list,
              itemCallBack.bind(this)
            );
            this.inventoryContainer.add([...this.displayedItems]);
            barterShowedElements = "player";
            break;

          default:
            this.elements.uiButton?.setTexture("uiInventory");
            break;
        }
      })
    );

    this.barterMoveButton.setDepth(this.inventoryContainer.length).on(
      "pointerup",
      (this.scene,
      () => {
        setTimeout(() => {
          switch (barterShowedElements) {
            case "player":
              if (this.checkedItem) {
                const boxList = [...list];
                const updatedList = this.list.filter((item, i) => {
                  return this.displayedItems[i] !== this.checkedItem;
                });
                clearItems(this.displayedItems);
                this.list = updatedList;
                this.displayedItems = createItems(
                  this.scene,
                  this.cells,
                  updatedList,
                  itemCallBack.bind(this)
                );
                this.inventoryContainer.add([...this.displayedItems]);
                boxList.push(this.checkedItem.params);
                this.checkedItem = null;
                this.frame.setPosition(-100, -100);
                clearParams(this.showItemParamElements);
                changeList(boxList);
              }
              break;

            case "box":
              if (this.checkedItem) {
                const updatedList = list.filter((item, i) => {
                  return this.displayedItems[i] !== this.checkedItem;
                });
                clearItems(this.displayedItems);
                changeList(updatedList);
                this.displayedItems = createItems(
                  this.scene,
                  this.cells,
                  updatedList,
                  itemCallBack.bind(this)
                );
                this.inventoryContainer.add([...this.displayedItems]);
                this.list.push(this.checkedItem.params);
                this.checkedItem = null;
                this.frame.setPosition(-100, -100);
                clearParams(this.showItemParamElements);
              }

              break;

            default:
              break;
          }
        }, 0);
      })
    );

    this.inventoryContainer.add([...this.displayedItems]);
    this.elements.container.setAlpha(1);
  }
  closeInventory() {
    this.elements.uiButton?.setTexture("uiInventory");

    this.inventoryStatus = "close";
    clearItems(this.displayedItems);
    this.barterButton?.destroy();
    this.barterMoveButton?.destroy();
    this.checkedItem = null;
    this.frame.setPosition(-100, -100);
    clearParams(this.showItemParamElements);

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
        ) {
          const changeList = (newList: Item[]) => {
            list.length = 0;
            list.push(...newList);
          };

          this.openBarter(list, changeList);
        }
      });

    return { img: inventoryImg, list };
  }
}
