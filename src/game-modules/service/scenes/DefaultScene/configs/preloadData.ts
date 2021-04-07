import { PreloadTypes } from "../../../../game/types";

const playerData = {
  frame: {
    frameWidth: 20,
    frameHeight: 45,
    startFrame: 0,
    endFrame: 3,
  },
  path: "game/assets/img/DefaultScene/characters/player/",
};

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
      ["playerLeft", `${playerData.path}p_left.png`, playerData.frame],
      ["playerRight", `${playerData.path}p_right.png`, playerData.frame],
      [
        "playerDown",
        `${playerData.path}p_down.png`,
        { ...playerData.frame, frameHeight: 44 },
      ],
      [
        "playerUp",
        `${playerData.path}p_up.png`,
        { ...playerData.frame, frameHeight: 44, frameWidth: 19 },
      ],
    ],
  },
];

export default data;
