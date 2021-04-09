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

  isCollisionCreated = false;

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
  move(cursor: any) {
    let speed = 100;
    let accuracy = 5;

    this.checkCollision(this.actor.x, this.actor.y, this.scene.world.world);
    const directionX = cursor.x - this.actor.x; // +right -left
    const directionY = cursor.y - this.actor.y; // +top -bottom

    let coordinateX = cursor.x;
    let coordinateY = cursor.y;

    if (this.collision.right.blocked) {
      console.log("🚀 ~ ~ this.collision.right", this.collision.right);

      if (directionX > 0) {
        coordinateX = this.actor.x;
      }
    } else if (this.collision.left.blocked) {
      console.log("🚀 ~ ~ this.collision.left", this.collision.left);

      if (directionX < 0) {
        coordinateX = this.actor.x;
      }
    }

    if (this.collision.top.blocked) {
      console.log("🚀 ~ ~ this.collision.top)", this.collision.top);

      if (directionY < 0) {
        coordinateY = this.actor.y;
      }
    } else if (this.collision.bottom.blocked) {
      console.log("🚀 ~ ~ this.collision.bottom)", this.collision.bottom);

      if (directionY > 0) {
        coordinateY = this.actor.y;
      }
    }
    // console.log(this.collision.right.blocked);

    const side = super.move(coordinateX, coordinateY, speed, accuracy);

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
