import { Scene } from "phaser";
import { AnimationConfig } from "../types";

export default function createAnimation(
  this: Scene,
  configs: AnimationConfig[]
) {
  configs.forEach((config) => {
    const { key, frame } = config;
    this.anims.create({
      key,
      frames: this.anims.generateFrameNumbers(frame.name, frame.ways),
      frameRate: frame.frameRate,
      repeat: frame.repeat,
    });
  });
}
