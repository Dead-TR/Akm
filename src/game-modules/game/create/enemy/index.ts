import DefaultScene from "../../../service/scenes/DefaultScene";
import { CharactersPosterity, EnemyAnimationsList } from "../../types";

import CreateCharacter from ".././character";

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
      coolDown: number;
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
        coolDown: number;
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

    this.createHealth();
  }

  watching(enemies: CharactersPosterity[], collision?: number[]) {
    let accuracy = 15;
    const fightDistance = 20;

    let target: CharactersPosterity | undefined = undefined;

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

      if (!this.mortal.target.goingFix) {
        this.mortal.target.goingFix = {
          x: Phaser.Math.Between(-8, 8),
          y: Phaser.Math.Between(-8, 8),
        };
      }

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
        params.coordinates.x + (this.mortal.target.goingFix?.x || 0),
        params.coordinates.y + (this.mortal.target.goingFix?.y || 0),
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

      this.mortalAnimationPlay(enemyOnAttackDistance);

      if (enemyOnAttackDistance) {
        this.mortalCalculate(target);
        target.mortal.enemy = this;

        if (side[0] === "stop" && side[1] === "stop") {
          if (this.mortal.target.goingFix) {
            this.mortal.target.goingFix = undefined;
          }
        }
      } else {
        target.mortal.enemy = null;
      }
    }
  }
}
