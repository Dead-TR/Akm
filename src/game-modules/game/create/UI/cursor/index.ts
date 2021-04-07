import { Scene } from "phaser";
import { CursorBorderType } from "../../../types";

export default function createCursor(
  this: Scene,
  x: number,
  y: number,
  size: number,
  scale: number,
  background: number,
  border?: CursorBorderType
) {
  const circle = this.add.circle(x, y, size, background);

  if (border) {
    const { color, size } = border;
    circle.setStrokeStyle(size, color);
  }

  const tween = this.tweens.add({
    delay: 0.1,
    targets: circle,
    scale: scale,
    yoyo: false,
    repeat: 0,
    alpha: 0,
    ease: "Sine.easeInOut",
  });

  this.input.on("pointerdown", () => {
    circle.x = this.input.x;
    circle.y = this.input.y;
    tween.restart();
  });

  return circle;
}
