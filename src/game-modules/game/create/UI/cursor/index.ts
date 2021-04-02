import { Scene } from "phaser";

interface BorderType {
  color: number;
  size: number;
}

export default function createCursor(
  this: Scene,
  size: number,
  background: number,
  border?: BorderType
) {
  const centerX = Number(this.game.config.width) / 2;
  const centerY = Number(this.game.config.height) / 2;

  const circle = this.add.circle(centerX, centerY, size, background);

  if (border) {
    const { color, size } = border;
    circle.setStrokeStyle(size, color);
  }
}

// https://labs.phaser.io/edit.html?src=src/game%20objects/shapes/circle.js&v=3.54.0
