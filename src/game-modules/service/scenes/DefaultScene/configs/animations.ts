import { AnimationConfig } from "../../../../game/types";

const playerGoFrames = {
  ways: {
    start: 0,
    end: 3,
  },
  frameRate: 6,
  repeat: -1,
};

export const playerAnims: AnimationConfig[] = [
  {
    key: "playerGoUp",
    frame: {
      ...playerGoFrames,
      name: "playerUp",
    },
  },
  {
    key: "playerGoDown",
    frame: {
      ...playerGoFrames,
      name: "playerDown",
    },
  },
  {
    key: "playerGoLeft",
    frame: {
      ...playerGoFrames,
      name: "playerLeft",
    },
  },
  {
    key: "playerGoRight",
    frame: {
      ...playerGoFrames,
      name: "playerRight",
    },
  },
];
