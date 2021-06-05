import DefaultScene from "../../../service/scenes/DefaultScene";
import { EnemyAnimationsList } from "../../types";

import CreateCharacter from ".././character";

type Actor = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export function createEnemy(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined,
  animations: EnemyAnimationsList,
  params?: {
    origin?: number[];
    vision?: number;
    char?: {
      speed: number;
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
  animations: EnemyAnimationsList;

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    animations: EnemyAnimationsList,

    params?: {
      origin?: number[];
      vision?: number;
      char?: {
        speed: number;
        health: number;
        armor: number;
        attack: number;
      };
    }
  ) {
    super(scene, x, y, spriteSheet, textureFrame, {
      origin: params?.origin,
      animations: animations,
    });
    this.scene = scene;
    this.visionDistance = params?.vision || this.visionDistance;

    this.animations = animations;

    if (params?.char) {
      this.params = params.char;
    }
  }

  watching(enemies: CreateCharacter[], collision?: number[]) {
    let accuracy = 15;
    const fightDistance = 16;

    let target: CreateCharacter | undefined = undefined;

    if (!target) {
      target = enemies.find((enemy) => {
        const xDifference = Math.abs(enemy.actor.x - this.actor.x);
        const yDifference = Math.abs(enemy.actor.y - this.actor.y);
        return (
          xDifference < this.visionDistance && yDifference < this.visionDistance
        );
      });
    }
    if (target) {
      const params = {
        direction: {
          x: target.actor.x - this.actor.x,
          y: target.actor.y - this.actor.y,
        },
        coordinates: {
          x: target.actor.x,
          y: target.actor.y,
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
        this.params.speed,
        accuracy
      );

      if (this.animations.movement) {
        const movement = this.animations.movement;

        this.movementAnimation(side, movement);
      }

      const enemyOnAttackDistance =
        Math.abs(params.direction.x) <= fightDistance &&
        Math.abs(params.direction.y) <= fightDistance;

      this.mortalPlay(enemyOnAttackDistance || !!this.mortal.enemy);

      if (enemyOnAttackDistance) {
        target.mortal.enemy = this;
      } else {
        target.mortal.enemy = null;
      }
    }
  }
}
