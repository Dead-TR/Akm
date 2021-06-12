import DefaultScene from "../..";
import { addUIListToLayers } from "./config";

export function addToLayer(scene: DefaultScene) {
  const addList = scene.engine.create.addToLayer;
  if (scene.engine.layers) {
    addList.characters(
      [...scene.enemy, scene.player],
      scene.engine.layers.gameElements.characters
    );

    addList.sprites(addUIListToLayers(scene), scene.engine.layers.ui);
  }
}
