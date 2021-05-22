import DefaultScene from "../../../service/scenes/DefaultScene";
import { AnimationsListType } from "../../../service/scenes/DefaultScene/configs/types";
import CreateCharacter from ".././character";
import { EnemyAnimationsList } from "./types";

type Actor = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export function createEnemy(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined,
  animations: AnimationsListType,
  params?: {
    origin?: number[];
    vision?: number;
    speed?: number;
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
    animations: AnimationsListType,

    params?: {
      origin?: number[];
      vision?: number;
      speed?: number;
    }
  ) {
    super(scene, x, y, spriteSheet, textureFrame, params?.origin);
    this.scene = scene;
    this.visionDistance = params?.vision || this.visionDistance;
    this.speed = params?.speed || this.speed;
    this.animations = {
      movement: animations,
    };
  }

  watching(enemies: Actor[], collision?: number[]) {
    let accuracy = 25;

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
      // console.log(this.animations);
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
        const [xSide, ySide] = side;
        const movement = this.animations.movement;

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
  }
}
