import { zombieAnimation } from "./animations";
import { EnemyListConfig } from "./types";

export const collisionCellIds = [0, 2, 3, 4, 5, 7, 8, 9, 10];

export const enemyList: EnemyListConfig[] = [
  {
    name: "zombie",
    config: {
      x: 300,
      y: 300,
      spriteSheet: "zombieDown",
      textureFrame: 1,
      origin: [0.5, 0.8],
    },
    animations: {
      movement: {
        list: zombieAnimation,
        names: {
          top: "zombieU",
          bottom: "zombieD",
          left: "zombieL",
          right: "zombieR",
        },
      },
    },
  },
];
