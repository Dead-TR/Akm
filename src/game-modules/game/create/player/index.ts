import DefaultScene from "../../../service/scenes/DefaultScene";
import CreateCharacter from "../character";

export function createPlayer(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined
) {
  return new CreatePlayer(this, x, y, spriteSheet, textureFrame);
}

enum Animation {
  "left" = "playerGoLeft",
  "right" = "playerGoRight",
  "top" = "playerGoUp",
  "bottom" = "playerGoDown",
}

export default class CreatePlayer extends CreateCharacter {
  scene: DefaultScene;

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined
  ) {
    super(scene, x, y, spriteSheet, textureFrame);

    this.scene = scene;
  }
  check() {
    console.log("actor: ", this);
  }

  move() {
    const coordinateX = this.scene.world.objects["cursor"].x;
    const coordinateY = this.scene.world.objects["cursor"].y;

    const side = super.move(coordinateX, coordinateY, 100, 5);

    const [xSide, ySide] = side;
    // side.forEach((value) => {
    //   if (value === "stop") {
    //     this.actor.anims.pause(this.actor.anims.currentAnim?.frames[1]);
    //   } else {
    //     if (this.actor.anims.currentAnim?.key !== Animation[value]) {
    //       this.actor.anims.play(Animation[value]);
    //     }
    //   }
    // });

    if (xSide === "left") {
      if (this.actor.anims.currentAnim?.key !== Animation[xSide])
        this.actor.anims.play(Animation[xSide]);
    } else if (xSide === "right") {
      if (this.actor.anims.currentAnim?.key !== Animation[xSide])
        this.actor.anims.play(Animation[xSide]);
    } else if (ySide === "top") {
      if (this.actor.anims.currentAnim?.key !== Animation[ySide])
        this.actor.anims.play(Animation[ySide]);
    } else if (ySide === "bottom") {
      if (this.actor.anims.currentAnim?.key !== Animation[ySide])
        this.actor.anims.play(Animation[ySide]);
    } else {
      this.actor.anims.pause(this.actor.anims.currentAnim?.frames[1]);
    }

    return side;
  }
}
