import { AnimationConfig } from "../../../../game/types";

const goingAnimationFrames = {
  ways: {
    start: 0,
    end: 3,
  },
  frameRate: 6,
  repeat: -1,
};

export const animationList: AnimationConfig[] = [
  {
    key: "playerGoUp",
    frame: {
      ...goingAnimationFrames,
      name: "playerUp",
    },
  },
  {
    key: "playerGoDown",
    frame: {
      ...goingAnimationFrames,
      name: "playerDown",
    },
  },
  {
    key: "playerGoLeft",
    frame: {
      ...goingAnimationFrames,
      name: "playerLeft",
    },
  },
  {
    key: "playerGoRight",
    frame: {
      ...goingAnimationFrames,
      name: "playerRight",
    },
  },
  {
    key: "zombieU",
    frame: {
      ...goingAnimationFrames,
      name: "zombieUp",
    },
  },
  {
    key: "zombieD",
    frame: {
      ...goingAnimationFrames,
      name: "zombieDown",
    },
  },
  {
    key: "zombieL",
    frame: {
      ...goingAnimationFrames,
      name: "zombieLeft",
    },
  },
  {
    key: "zombieR",
    frame: {
      ...goingAnimationFrames,
      name: "zombieRight",
    },
  },
];
