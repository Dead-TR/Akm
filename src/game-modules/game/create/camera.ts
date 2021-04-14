import { Scene } from "phaser";

export default function createCamera(
  this: Scene,
  actor: Phaser.GameObjects.GameObject | Object,
  world: any
) {
  const camera = this.cameras.main;

  camera
    .setBounds(0, 0, Number(world.width), Number(world.height))
    .startFollow(actor, true, 1, 1, 0, 0);

  return camera;
}
