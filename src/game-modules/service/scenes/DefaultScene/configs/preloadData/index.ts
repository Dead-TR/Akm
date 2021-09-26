import { PreloadTypes } from "../../../../../game/types";
import { characterData, fightEffects } from "./preloadSettings";

const assets = "game/assets/";

const data: PreloadTypes[] = [
  {
    method: "image",
    data: [
      // any/worlds:
      ["exampleGrassTile", assets + "img/DefaultScene/grass.png"],
      ["frame", assets + "img/general/frame.png"],
      ["empty", assets + "img/general/emptyLayers.png"],
      ["inventoryBox", assets + "img/general/items/box.png"],

      //inventory:
      // > inv elements
      ["inventoryElement_1", assets + "img/general/items/body/1.png"],
      ["inventoryElement_2", assets + "img/general/items/arm/1.png"],
      // > inv UI
      ["inventoryBG", assets + "img/general/ui/inventoryBG.png"],
      // >> inv buttons
      ["uiInventory", assets + "img/general/ui/inventory.png"],
      ["uiInventoryBox", assets + "img/general/ui/box.png"],
      ["barterButton", assets + "img/general/b_button.png"],
      ["moveButton", assets + "img/general/to_button.png"],
      ["pickButton", assets + "img/general/pick_button.png"],

      //portraits:
      ["playerPortrait", assets + "img/DefaultScene/portraits/player.jpg"],
    ],
  },
  {
    method: "tilemapCSV",
    data: [["exampleGrid", assets + "grids/DefaultScene/grass.csv"]],
  },
  {
    method: "spritesheet",
    data: [
      ["playerLeft", `${characterData.player}p_left.png`, characterData.frame],
      [
        "playerRight",
        `${characterData.player}p_right.png`,
        characterData.frame,
      ],
      [
        "playerDown",
        `${characterData.player}p_down.png`,
        { ...characterData.frame, frameHeight: 44 },
      ],
      [
        "playerUp",
        `${characterData.player}p_up.png`,
        { ...characterData.frame, frameHeight: 44, frameWidth: 19 },
      ],

      [
        "zombieLeft",
        `${characterData.zombie}p_left.png`,
        { ...characterData.frame, frameHeight: 41, frameWidth: 22 },
      ],
      [
        "zombieRight",
        `${characterData.zombie}p_right.png`,
        { ...characterData.frame, frameHeight: 41, frameWidth: 22 },
      ],
      ["zombieUp", `${characterData.zombie}p_up.png`, characterData.frame],
      ["zombieDown", `${characterData.zombie}p_down.png`, characterData.frame],
      [
        "claws",
        `${fightEffects.path}${fightEffects.claws.name}`,
        fightEffects.claws.frame,
      ],
      [
        "sword_1",
        `${fightEffects.path}${fightEffects.sword_1.name}`,
        fightEffects.sword_1.frame,
      ],
    ],
  },
];

export default data;
