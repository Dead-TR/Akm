import { AnimationConfig } from "../../../../../game/types";
import { fightFrames, goingFrames } from "./settings";

export const animationList: AnimationConfig[] = [
  {
    key: "playerGoUp",
    frame: {
      ...goingFrames,
      name: "playerUp",
    },
  },
  {
    key: "playerGoDown",
    frame: {
      ...goingFrames,
      name: "playerDown",
    },
  },
  {
    key: "playerGoLeft",
    frame: {
      ...goingFrames,
      name: "playerLeft",
    },
  },
  {
    key: "playerGoRight",
    frame: {
      ...goingFrames,
      name: "playerRight",
    },
  },
  {
    key: "zombieU",
    frame: {
      ...goingFrames,
      name: "zombieUp",
    },
  },
  {
    key: "zombieD",
    frame: {
      ...goingFrames,
      name: "zombieDown",
    },
  },
  {
    key: "zombieL",
    frame: {
      ...goingFrames,
      name: "zombieLeft",
    },
  },
  {
    key: "zombieR",
    frame: {
      ...goingFrames,
      name: "zombieRight",
    },
  },
  {
    key: "clawsFight",
    frame: {
      ...fightFrames,
      name: "claws",
    },
  },
];
