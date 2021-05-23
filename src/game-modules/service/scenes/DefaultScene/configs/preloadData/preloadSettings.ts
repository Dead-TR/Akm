export const characterData = {
  frame: {
    frameWidth: 20,
    frameHeight: 45,
    startFrame: 0,
    endFrame: 3,
  },
  player: "game/assets/img/DefaultScene/characters/player/",
  zombie: "game/assets/img/DefaultScene/characters/enemies/zombie/",
};

const effectsPath = "game/assets/img/DefaultScene/effects/";

export const fightEffects = {
  path: `${effectsPath}fight/`,
  claws: {
    name: "claws.png",
    frame: {
      frameWidth: 80,
      frameHeight: 80,
      startFrame: 0,
      endFrame: 22,
    },
  },
  sword_1: {
    name: "sword_1.png",
    frame: {
      frameWidth: 192,
      frameHeight: 192,
      startFrame: 0,
      endFrame: 23,
    },
  },
};
