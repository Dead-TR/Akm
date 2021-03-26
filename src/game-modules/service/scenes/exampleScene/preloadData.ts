import { PreloadTypes } from "../../../game/types";

const data: PreloadTypes[] = [
  {
    method: "image",
    data: ["exampleGrassTile", "game/assets/img/exampleScene/grass.png"],
  },
  {
    method: "tilemapCSV",
    data: ["exampleGrid", "game/assets/grids/exampleScene/grass.csv"],
  },
];

export default data;
