import DefaultScene from "..";
import { collisionCellIds, enemyList } from "./config";

export default function create(scene: DefaultScene) {
  enemyList.forEach((unit) => {
    const { name, config, animations } = unit;
    scene.enemy[name] = scene.engine.create.enemy(
      config.x,
      config.y,
      config.spriteSheet,
      config.textureFrame,
      animations,
      {
        origin: config.origin,
        vision: 50,
        speed: 100,
      }
    );
  });
}

export function movementWatching(scene: DefaultScene) {
  for (const [name, character] of Object.entries(scene.enemy)) {
    character.watching([scene.player.actor], collisionCellIds);
  }
}
