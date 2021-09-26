import { Inventory } from "..";
import DefaultScene from "../../../service/scenes/DefaultScene";
import { CharacterAnimationsList, UserSkills } from "../../types";
import CreateCharacter from "../character";

let test: any;
export function createPlayer(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined,
  params: {
    animation: CharacterAnimationsList;
    origin?: number[];
    inventory: string;
  }
) {
  return new CreatePlayer(this, x, y, spriteSheet, textureFrame, params);
}

export default class CreatePlayer extends CreateCharacter {
  scene: DefaultScene;
  inventory: Inventory;
  skills: UserSkills = {
    health: 10,
    armor: 0,
    attack: 1,
    coolDown: 20,
    speed: 100,
  };
  portrait: Phaser.GameObjects.Sprite;

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    params: {
      origin?: number[];
      animation: CharacterAnimationsList;
      inventory: string;
    }
  ) {
    super(scene, x, y, spriteSheet, textureFrame, {
      origin: params?.origin,
      animations: params.animation,
    });
    this.scene = scene;
    this.animations = params.animation;

    this.params = {
      ...this.skills,
    };

    this.inventory = scene.engine.create.inventory({
      img: "uiInventory",
    });

    this.portrait = scene.add
      .sprite(0, 0, "playerPortrait")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    if (this.scene.engine.layers?.ui && this.inventory.elements.uiButton) {
      this.scene.engine.layers.ui.add(this.inventory.elements.uiButton);
      this.scene.engine.layers.ui.add(this.portrait);
    }
  }

  //@ts-ignore
  move(cursor: any, world: any, collision: number[]) {
    let accuracy = 5;

    this.checkCollision(world, collision);
    const params = {
      direction: {
        x: cursor.x - this.actor.x,
        y: cursor.y - this.actor.y,
      },
      coordinates: {
        x: cursor.x,
        y: cursor.y,
      },
    };

    this.createCollision(params);

    const side = super.move(
      params.coordinates.x,
      params.coordinates.y,
      this.params.speed,
      accuracy
    );

    this.movementAnimation(side, this.animations?.movement);
    this.mortalAnimationPlay(!!this.mortal.enemy);

    if (this.mortal.enemy) {
      this.mortalCalculate(this.mortal.enemy);
    }

    return side;
  }
}
