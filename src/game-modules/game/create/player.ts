import { Scene } from "phaser";
import CreateCharacter from "./character";

export function createPlayer(
  this: Scene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined
) {
  return new CreatePlayer(this, x, y, spriteSheet, textureFrame);
}

export default class CreatePlayer extends CreateCharacter {
  check() {
    console.log("actor: ", this);
  }
}
