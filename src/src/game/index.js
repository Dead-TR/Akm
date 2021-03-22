import Character from "./base/character";
import createWorld from "./create/world";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.base = {
      Character: Character,
    };

    this.create = {
      createWorld,
    };
  }
}
