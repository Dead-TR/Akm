import { GameObjects, Scene } from "phaser";
import { LayerElementType } from "../../types";

export function addSpriteToLayer(
  this: Scene,
  element: LayerElementType[] | LayerElementType,
  layer: GameObjects.Layer
) {
  const elementList: LayerElementType[] = [];
  if (Array.isArray(element)) {
    elementList.push(...element);
  } else {
    elementList.push(element);
  }

  elementList.forEach((el) => layer.add(el));
}
