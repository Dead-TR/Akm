import DefaultScene from "..";
import { collisionCellIds, enemyList } from "./config";

export default function create(scene: DefaultScene) {
  enemyList.forEach((enemyUnit) => {
    const { name, config, animations } = enemyUnit;
    scene.enemy[name] = scene.engine.create.enemy(
      config.x,
      config.y,
      config.spriteSheet,
      config.textureFrame,
      animations,
      {
        origin: config.origin,
        vision: 150,
        speed: 100,
      }
    );
  });
}

export function movementWatching(scene: DefaultScene) {
  for (const [name, character] of Object.entries(scene.enemy)) {
    character.watching([scene.player], collisionCellIds);
  }
}

export function setDeath(scene: DefaultScene) {
  for (const [name, character] of Object.entries(scene.enemy)) {
    if (character.params.health < 0) {
      delete scene.enemy[name];
    }
  }
}
