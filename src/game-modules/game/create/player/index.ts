import { Inventory } from "..";
import DefaultScene from "../../../service/scenes/DefaultScene";
import { CharacterAnimationsList } from "../../types";
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
      health: 100,
      armor: 999999999999999,
      attack: 11,
      coolDown: 0,
      speed: 100,
    };

    this.inventory = scene.engine.create.inventory({
      playerInv: {
        img: "uiInventory",
      },
    });

    if (this.scene.engine.layers?.ui && this.inventory.elements.uiButton) {
      this.scene.engine.layers.ui.add(this.inventory.elements.uiButton);
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
