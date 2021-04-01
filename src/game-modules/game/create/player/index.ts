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
    if (this.actor.x !== this.scene.world.objects["cursor"].x) {
      const coordinateX = this.scene.world.objects["cursor"].x;
      const coordinateY = this.scene.world.objects["cursor"].y;

      super.move(coordinateX, coordinateY, 100, 5);
    }
  }
}
