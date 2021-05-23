import { PreloadTypes } from "../../../../../game/types";
import { characterData, fightEffects } from "./preloadSettings";

const data: PreloadTypes[] = [
  {
    method: "image",
    data: [
      ["exampleGrassTile", "game/assets/img/DefaultScene/grass.png"],
      ["cursor", "game/assets/img/general/cursor.png"],
      ["empty", "game/assets/img/general/emptyLayers.png"],
    ],
  },
  {
    method: "tilemapCSV",
    data: [["exampleGrid", "game/assets/grids/DefaultScene/grass.csv"]],
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
