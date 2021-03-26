import ExampleScene from "./scenes/exampleScene";

export const config = {
  type: Phaser.AUTO,
  parent: "game-box",
  width: 480,
  height: 480,
  scene: [ExampleScene],
  backgroundColor: 0x14003b,
  // transparent: true
};
