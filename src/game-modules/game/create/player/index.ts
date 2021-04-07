import DefaultScene from "../../../service/scenes/DefaultScene";
import CreateCharacter from "../character";

enum Animation {
  "left" = "playerGoLeft",
  "right" = "playerGoRight",
  "top" = "playerGoUp",
  "bottom" = "playerGoDown",
}

interface MoveLayer {
  layer: Phaser.Tilemaps.Tilemap;
  stops: number[];
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
  check() {
    console.log("actor: ", this);
  }

  //@ts-ignore
  move(cursor: any, layer?: MoveLayer) {
    let coordinateX = cursor.x;
    let coordinateY = cursor.y;

    if (layer) {
      const tile = layer.layer.getTileAtWorldXY(
        this.actor.x,
        this.actor.y,
        false
      );

      layer.stops.forEach((id) => {
        if (id === tile.index) {
          this.actor.anims.pause(this.actor.anims.currentAnim?.frames[1]);
        }
      });
    }
    const side = super.move(coordinateX, coordinateY, 100, 5);

    const [xSide, ySide] = side;

    if (xSide !== "stop") {
      if (this.actor.anims.isPaused) {
        this.actor.anims.play(this.actor.anims.currentAnim);
      }

      if (this.actor.anims.currentAnim?.key !== Animation[xSide]) {
        this.actor.anims.play(Animation[xSide]);
      }
    } else if (ySide !== "stop") {
      if (this.actor.anims.isPaused) {
        this.actor.anims.play(this.actor.anims.currentAnim);
      }

      if (this.actor.anims.currentAnim?.key !== Animation[ySide]) {
        this.actor.anims.play(Animation[ySide]);
      }
    } else {
      this.actor.anims.pause(this.actor.anims.currentAnim?.frames[1]);
    }

    return side;
  }
}
