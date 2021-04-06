import DefaultScene from "./scenes/DefaultScene";

const groundSpriteSize = 32;
const minGroundNumber = 15;
const size = groundSpriteSize * minGroundNumber;

export const config = {
  type: Phaser.AUTO,
  parent: "game-box",
  width: size,
  height: size,
  scene: [DefaultScene],
  backgroundColor: 0x14003b,
  // transparent: true
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};
