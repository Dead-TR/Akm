import { Scene } from "phaser";
import { CursorBorderType } from "../../../types";

export default function createCursor(
  this: Scene,
  x: number,
  y: number,
  size: number,
  scale: number,
  background: number,
  border?: CursorBorderType | null,
  camera?: Phaser.Cameras.Scene2D.Camera
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

  this.input.on("pointerdown", (pointer: any, element: any[]) => {
    if (element.length) {
      return;
    }

    let fehlerX = 0,
      fehlerY = 0;

    if (camera) {
      fehlerX = camera.scrollX;
      fehlerY = camera.scrollY;
    }

    circle.x = this.input.x + fehlerX;
    circle.y = this.input.y + fehlerY;
    tween.restart();
  });

  return circle;
}
