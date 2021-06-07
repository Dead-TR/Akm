import { Scene } from "phaser";
import { CharactersPosterity } from "../types";

const accuracy = 50;
export function checkCharacterZIndex(
  this: Scene,
  characters: CharactersPosterity[]
) {
  const sortedCharacters = [...characters].sort(
    (charA, charB) => charA.actor.y - charB.actor.y
  );

  sortedCharacters.forEach((char, i) => {
    char.actor.setDepth(i);
  });
}
