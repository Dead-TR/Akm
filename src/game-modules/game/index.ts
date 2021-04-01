import { createWorld } from "./create/world";
import { preloadData } from "./load/preload";
import { CreateGameTypes, LoadGameTypes } from "./types";
import { createPlayer } from "./create/player";
import createAnimation from "./create/animation";
import DefaultScene from "../service/scenes/DefaultScene";

export default class Game {
  scene: DefaultScene;
  create: CreateGameTypes;
  load: LoadGameTypes;

  constructor(scene: DefaultScene) {
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
