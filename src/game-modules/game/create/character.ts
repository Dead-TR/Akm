import { Scene } from "phaser";
import { AnimationConfig } from "../types";
import createAnimation from "./animation";

export default class CreateCharacter {
  actor;
  scene: Scene;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined
  ) {
    this.scene = scene;
    this.actor = scene.physics.add.sprite(x, y, spriteSheet, textureFrame);
  }

  addAnimation(configs: AnimationConfig[]) {
    createAnimation.call(this.scene, configs);
  }

  move(x: number, y: number, speed = 100, accuracy = 10) {
    const xSide =
      this.actor.x - x < -accuracy
        ? "left"
        : this.actor.x - x > accuracy
        ? "right"
        : "stop";
    const ySide =
      this.actor.y - y < -accuracy
        ? "top"
        : this.actor.y - y > accuracy
        ? "bottom"
        : "stop";

    if (xSide === "left") {
      this.actor.setVelocityX(speed);
    } else if (xSide === "right") {
      this.actor.setVelocityX(-speed);
    } else {
      this.actor.setVelocityX(0);
    }

    if (ySide === "top") {
      this.actor.setVelocityY(speed);
    } else if (ySide === "bottom") {
      this.actor.setVelocityY(-speed);
    } else {
      this.actor.setVelocityY(0);
    }
  }
}
