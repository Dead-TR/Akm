import { Scene } from "phaser";
import {
  AnimationsListType,
  CharacterAnimationsList,
  CharactersPosterity,
  MortalTypes,
  Sides,
} from "../types";

export default class CreateCharacter {
  actor;
  scene: Scene;
  animations?: CharacterAnimationsList;
  params = {
    health: 100,
    armor: 10,
    attack: 10,

    speed: 100,
    coolDown: 50,
  };
  mortal: MortalTypes = {
    isActive: false,
    sword: null,
    enemy: null,

    fight: {
      coolDown: 50,
    },
  };
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
  dead = false;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    params: {
      origin?: number[];
      animations?: CharacterAnimationsList;
    }
  ) {
    this.scene = scene;
    this.actor = scene.physics.add.sprite(x, y, spriteSheet, textureFrame);

    if (params.origin) {
      this.actor.setOrigin(...params.origin);
    }
  }

  setDeath() {
    this.mortal.sword?.destroy();
    this.mortal.isActive = false;
    this.actor.destroy();
    this.dead = true;
  }

  mortalAnimationPlay(isFight?: boolean) {
    if (!this.animations || this.dead) {
      return;
    }
    if (isFight) {
      if (!this.mortal.isActive) {
        this.mortal.isActive = true;

        if (!this.mortal.sword) {
          this.mortal.sword = this.scene.add
            .sprite(this.actor.x, this.actor.y, "")
            .setOrigin(this.actor.originX, this.actor.originY);

          this.mortal.sword.play(this.animations.sword);
        }
      } else {
        if (this.mortal.sword) {
          this.mortal.sword.x = this.actor.x;
          this.mortal.sword.y = this.actor.y;
          this.mortal.sword.setDepth(this.actor.depth + 1);
        }
      }
    } else {
      if (this.mortal.isActive) {
        this.mortal.isActive = false;
      }
      if (this.mortal.sword) {
        this.mortal.sword.destroy();
        this.mortal.sword = null;
      }
    }
  }

  mortalCalculate(enemy?: CharactersPosterity) {
    if (!enemy || this.dead) {
      return;
    }

    if (this.mortal.fight.coolDown === this.params.coolDown) {
      const damage = this.params.attack - enemy.params.armor;
      const minDamage = 0;
      enemy.params.health -= damage > 0 ? damage : minDamage;
    }

    if (enemy.params.health <= 0) {
      enemy.setDeath();
      this.mortal.sword?.destroy();
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
    if (this.dead) {
      return ["stop", "stop"];
    }

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

  movementAnimation(side: Sides[], movement?: AnimationsListType) {
    if (!movement || this.dead) {
      return;
    }
    const [xSide, ySide] = side;

    if (xSide !== "stop") {
      if (this.actor.anims.isPaused) {
        this.actor.anims.play(this.actor.anims.currentAnim);
      }

      if (this.actor.anims.currentAnim?.key !== movement[xSide]) {
        this.actor.anims.play(movement[xSide]);
      }
    } else if (ySide !== "stop") {
      if (this.actor.anims.isPaused) {
        this.actor.anims.play(this.actor.anims.currentAnim);
      }

      if (this.actor.anims.currentAnim?.key !== movement[ySide]) {
        this.actor.anims.play(movement[ySide]);
      }
    } else {
      this.actor.anims.pause(this.actor.anims.currentAnim?.frames[1]);
    }
  }
}
