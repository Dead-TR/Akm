import { Scene } from "phaser";

export const createButton = (scene: Scene, callBack?: () => void) => {
  const buttonWidth = 50,
    buttonHeight = 50,
    xPosition = Number(scene.game.config.width) - buttonWidth,
    yPosition = 100;

  const button = scene.add
    .sprite(xPosition, yPosition, "barterButton")
    .setInteractive();

  return button;
};
