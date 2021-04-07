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
  collision: Phaser.Physics.Arcade.StaticGroup;

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    origin?: number[]
  ) {
    super(scene, x, y, spriteSheet, textureFrame, origin);
    this.collision = scene.physics.add.staticGroup();
    this.scene = scene;
  }
  check() {
    console.log("actor: ", this);
  }

  //@ts-ignore
  move(cursor: any) {
    let coordinateX = cursor.x;
    let coordinateY = cursor.y;
    let speed = 100;
    let accuracy = 5;

    const side = super.move(coordinateX, coordinateY, speed, accuracy);

    // console.log(this.scene.world.world);

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
