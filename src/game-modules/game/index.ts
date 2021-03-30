import { createWorld } from "./create/world";
import { Scene } from "phaser";
import { preloadData } from "./load/preload";
import { CreateGameTypes, LoadGameTypes } from "./types";
import { createPlayer } from "./create/player";
import createAnimation from "./create/animation";

export default class Game {
  scene: Scene;
  create: CreateGameTypes;
  load: LoadGameTypes;

  constructor(scene: Scene) {
    this.scene = scene;
    this.create = {
      world: createWorld.bind(this.scene),
      player: createPlayer.bind(this.scene),
      animation: createAnimation.bind(this.scene),
    };
    this.load = {
      preload: preloadData.bind(this.scene),
    };
  }

  addListeners(event: string | symbol, callBack: () => void) {
    this.scene.input.on(event, callBack);
  }
}
