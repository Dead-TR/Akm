import Character from "./base/character";
import createWorld from "./create/world";
import { Scene } from "phaser";
import { preloadData } from "./load/preload";
import { CreateGameTypes, LoadGameTypes } from "./types";

export default class Game {
  scene: Scene;
  create: CreateGameTypes;
  load: LoadGameTypes;
  constructor(scene: Scene) {
    this.scene = scene;
    this.create = {
      world: createWorld.bind(this.scene),
    };
    this.load = {
      preload: preloadData.bind(this.scene),
    };
  }
}
