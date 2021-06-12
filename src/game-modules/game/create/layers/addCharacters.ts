import { Scene } from "phaser";
import { CharactersPosterity } from "../../types";

export function addCharactersToLayer(
  this: Scene,
  characters: CharactersPosterity[],
  layer: Phaser.GameObjects.Layer
) {
  characters.forEach((character) => {
    const { actor, elements } = character;
    layer.add(actor);
    if (elements?.healthLine) {
      layer.add(elements.healthLine);
    }
  });
}
