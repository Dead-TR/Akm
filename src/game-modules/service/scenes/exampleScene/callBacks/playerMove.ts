import ExampleScene from "../index";

export default function playerMove(scene: ExampleScene) {
  if (scene.player.actor.x !== scene.world.objects["cursor"].x) {
    const coordinateX = scene.world.objects["cursor"].x;
    const coordinateY = scene.world.objects["cursor"].y;

    scene.player.move(coordinateX, coordinateY, 100, 5);
  }
}
