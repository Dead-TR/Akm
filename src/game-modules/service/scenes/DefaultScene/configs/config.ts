import { EnemyListConfig } from "../../../../game/types";

export const collisionCellIds = [0, 2, 3, 4, 5, 7, 8, 9, 10];

export const enemyList: EnemyListConfig[] = [
  {
    name: "zombie",
    config: {
      x: 250,
      y: 510,
      spriteSheet: "zombieDown",
      textureFrame: 1,
      origin: [0.5, 0.8],
    },
    animations: {
      movement: {
        top: "zombieU", //animationList > key
        bottom: "zombieD",
        left: "zombieL",
        right: "zombieR",
      },
      sword: "clawsFight",
    },
  },
];
