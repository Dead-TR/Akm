import ExampleScene from "./scenes/exampleScene";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 500,
  height: 500,
  scene: [ExampleScene],
  backgroundColor: 0x14003b,
  // transparent: true
};
