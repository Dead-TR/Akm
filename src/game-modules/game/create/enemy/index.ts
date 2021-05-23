import DefaultScene from "../../../service/scenes/DefaultScene";
import {
  AnimationsListType,
  EnemyAnimationTypes,
} from "../../../service/scenes/DefaultScene/configs/types";
import CreateCharacter from ".././character";
import { EnemyAnimationsList } from "./types";

type Actor = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export function createEnemy(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined,
  animations: EnemyAnimationTypes,
  params?: {
    origin?: number[];
    vision?: number;
    speed?: number;
    char?: {
      health: number;
      armor: number;
      attack: number;
    };
  }
) {
  return new CreateEnemy(
    this,
    x,
    y,
    spriteSheet,
    textureFrame,
    animations,
    params
  );
}

export default class CreateEnemy extends CreateCharacter {
  scene: DefaultScene;
  visionDistance = 100;
  speed = 100;
  animations: EnemyAnimationsList;

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    animations: EnemyAnimationTypes,

    params?: {
      origin?: number[];
      vision?: number;
      speed?: number;
      char?: {
        health: number;
        armor: number;
        attack: number;
      };
    }
  ) {
    super(scene, x, y, spriteSheet, textureFrame, params?.origin);
    this.scene = scene;
    this.visionDistance = params?.vision || this.visionDistance;
    this.speed = params?.speed || this.speed;
    this.animations = animations;

    if (params?.char) {
      this.params = params.char;
    }
  }

  watching(enemies: Actor[], collision?: number[]) {
    let accuracy = 15;
    const fightDistance = 16;

    let target: Actor | undefined = undefined;

    if (!target) {
      target = enemies.find((enemy) => {
        const xDifference = Math.abs(enemy.x - this.actor.x);
        const yDifference = Math.abs(enemy.y - this.actor.y);

        if (
          xDifference < this.visionDistance ||
          yDifference < this.visionDistance
        ) {
          return enemy;
        }
      });
    }
    if (target) {
      const params = {
        direction: {
          x: target.x - this.actor.x,
          y: target.y - this.actor.y,
        },
        coordinates: {
          x: target.x,
          y: target.y,
        },
      };
      if (collision) {
        this.checkCollision(
          this.actor.x,
          this.actor.y,
          this.scene.world.world,
          collision
        );
        this.createCollision(params);
      }
      const side = super.move(
        params.coordinates.x,
        params.coordinates.y,
        this.speed,
        accuracy
      );

      if (this.animations.movement) {
        const movement = this.animations.movement;

        this.movementAnimation(side, movement);
      }

      if (
        Math.abs(params.direction.x) <= fightDistance &&
        Math.abs(params.direction.y) <= fightDistance
      ) {
        if (!this.mortal.isActive) {
          this.mortal.isActive = true;

          this.mortal.sword = this.scene.add
            .sprite(this.actor.x, this.actor.y, "")
            .setOrigin(this.actor.originX, this.actor.originY);

          if (this.animations.sword) {
            this.mortal.sword.play(this.animations.sword);
          }
        } else {
          if (this.mortal.sword) {
            this.mortal.sword.x = this.actor.x;
            this.mortal.sword.y = this.actor.y;
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
  }
}
