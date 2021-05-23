import { Scene } from "phaser";
import { AnimationConfig, Sides } from "../types";
import createAnimation from "./animation";

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

  checkCollision(x: number, y: number, world: any, collision: number[]) {
    for (const [key, value] of Object.entries(this.collision)) {
      const valueLine = key === "top" || key === "bottom" ? "y" : "x";

      const worldIndex = world.getTileAtWorldXY(
        valueLine === "x" ? x + value.calc : x,
        valueLine === "y" ? y + value.calc : y,
        false
      )?.index;

      const id = collision.indexOf(worldIndex ? worldIndex : 0);

      if (!id || id !== -1) {
        value.blocked = true;
      } else {
        value.blocked = false;
      }
    }
  }

  createCollision(params: {
    direction: {
      x: number;
      y: number;
    };
    coordinates: {
      x: number;
      y: number;
    };
  }) {
    if (this.collision.right.blocked) {
      if (params.direction.x > 0) {
        params.coordinates.x = this.actor.x;
      }
    } else if (this.collision.left.blocked) {
      if (params.direction.x < 0) {
        params.coordinates.x = this.actor.x;
      }
    }

    if (this.collision.bottom.blocked) {
      if (params.direction.y > 0) {
        params.coordinates.y = this.actor.y;
      }
    } else if (this.collision.top.blocked) {
      if (params.direction.y < 0) {
        params.coordinates.y = this.actor.y;
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
