import { Scene } from "phaser";

export const createButton = (
  scene: Scene,
  type: "open" | "move" | "pick",
  position: number
) => {
  const buttonWidth = 50,
    buttonHeight = 50,
    xPosition = Number(scene.game.config.width) - buttonWidth - 30,
    yPosition = 100 + (buttonHeight + 10) * position;

  let buttonId = "";

  switch (type) {
    default:
    case "open":
      buttonId = "barterButton";
      break;
    case "move":
      buttonId = "moveButton";
      break;
    case "pick":
      buttonId = "pickButton";

      break;
  }
  return scene.add
    .sprite(xPosition, yPosition, buttonId)
    .setOrigin(1, 0.5)
    .setInteractive()
    .setScrollFactor(0);
};
