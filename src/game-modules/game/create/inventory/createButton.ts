import { Scene } from "phaser";

export const createButton = (scene: Scene, type: "open" | "move") => {
  const buttonWidth = 50,
    buttonHeight = 50,
    xPosition = Number(scene.game.config.width) - buttonWidth - 30,
    yPositionOpen = 100,
    yPositionMove = 100 + buttonHeight + 10;

  switch (type) {
    default:
    case "open":
      return scene.add
        .sprite(xPosition, yPositionOpen, "barterButton")
        .setOrigin(1, 0.5)
        .setInteractive()
        .setScrollFactor(0);

    case "move":
      return scene.add
        .sprite(xPosition, yPositionMove, "moveButton")
        .setOrigin(1, 0.5)
        .setInteractive()
        .setScrollFactor(0);
  }
};
