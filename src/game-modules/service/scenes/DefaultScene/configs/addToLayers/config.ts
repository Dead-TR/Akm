import DefaultScene from "../..";
import { LayerElementType } from "../../../../../game/types";

export const addUIListToLayers = (scene: DefaultScene) => {
  const result: LayerElementType[] = [
    scene.player.inventory.elements.container,
  ];

  if (scene.player.inventory.elements.uiButton) {
    result.push(scene.player.inventory.elements.uiButton);
  }

  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    element.setDepth(i);
  }

  return result;
};
