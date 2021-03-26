import Character from "./base/character";
import createWorld from "./create/world";
import { Scene } from "phaser";
import { preloadData } from "./load/preload";

export default class Game {
  scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }
  load = {
    preload: preloadData,
  };
  create = {
    world: createWorld,
  };
}
