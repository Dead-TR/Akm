import { Scene } from "phaser";
import { AnimationConfig, Sides } from "../types";
import createAnimation from "./animation";

const stops = [0, 2, 3, 4, 5, 7, 8, 9, 10];

export default class CreateCharacter {
  actor;
  scene: Scene;

  collision = {
    top: {
      calc: -15,
      blocked: false,
    },
    bottom: {
      calc: 15,
      blocked: false,
    },
    left: {
      calc: -15,
      blocked: false,
    },
    right: {
      calc: 15,
      blocked: false,
    },
  };

  constructor(
    scene: Scene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    origin?: number[]
  ) {
    this.scene = scene;
    this.actor = scene.physics.add.sprite(x, y, spriteSheet, textureFrame);

    if (origin) {
      this.actor.setOrigin(...origin);
    }
  }

  addAnimation(configs: AnimationConfig[]) {
    createAnimation.call(this.scene, configs);
  }

  checkCollision(x: number, y: number, world: any) {
    for (const [key, value] of Object.entries(this.collision)) {
      const valueLine = key === "top" || key === "bottom" ? "y" : "x";

      const id = stops.indexOf(
        world.getTileAtWorldXY(
          valueLine === "x" ? x + value.calc : x,
          valueLine === "y" ? y + value.calc : y,
          false
        )?.index
      );

      if (!id || id !== -1) {
        value.blocked = true;
      } else {
        value.blocked = false;
      }
    }
  }

  move(x: number, y: number, speed = 100, accuracy = 10): Sides[] {
    const xSide =
      this.actor.x - x < -accuracy
        ? "right"
        : this.actor.x - x > accuracy
        ? "left"
        : "stop";
    const ySide =
      this.actor.y - y < -accuracy
        ? "bottom"
        : this.actor.y - y > accuracy
        ? "top"
        : "stop";

    if (xSide === "right") {
      this.actor.setVelocityX(speed);
    } else if (xSide === "left") {
      this.actor.setVelocityX(-speed);
    } else {
      this.actor.setVelocityX(0);
    }

    if (ySide === "bottom") {
      this.actor.setVelocityY(speed);
    } else if (ySide === "top") {
      this.actor.setVelocityY(-speed);
    } else {
      this.actor.setVelocityY(0);
    }

    return [xSide, ySide];
  }
}
