import DefaultScene from "../../../service/scenes/DefaultScene";
import CreateCharacter from "../character";

enum Animation {
  "left" = "playerGoLeft",
  "right" = "playerGoRight",
  "top" = "playerGoUp",
  "bottom" = "playerGoDown",
}

export function createPlayer(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined,
  origin?: number[]
) {
  return new CreatePlayer(this, x, y, spriteSheet, textureFrame, origin);
}

export default class CreatePlayer extends CreateCharacter {
  scene: DefaultScene;

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    origin?: number[]
  ) {
    super(scene, x, y, spriteSheet, textureFrame, origin);
    this.scene = scene;
  }

  //@ts-ignore
  move(cursor: any, world: any, collision: number[]) {
    let speed = 100;
    let accuracy = 5;

    this.checkCollision(this.actor.x, this.actor.y, world, collision);
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
      speed,
      accuracy
    );

    this.movementAnimation(side, Animation);

    return side;
  }
}
