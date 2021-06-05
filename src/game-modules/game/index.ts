import {
  createAnimation,
  createCamera,
  createCursor,
  createEnemy,
  createPlayer,
  createWorld,
} from "./create";
import { CreateGameTypes, LoadGameTypes, UpdateGameTypes } from "./types";
import { preloadData } from "./load/preload";
import DefaultScene from "../service/scenes/DefaultScene";
import { checkCharacterZIndex } from "./update";

export default class Game {
  scene: DefaultScene;
  load: LoadGameTypes;
  create: CreateGameTypes;
  update: UpdateGameTypes;

  constructor(scene: DefaultScene) {
    this.scene = scene;
    this.load = {
      preload: preloadData.bind(this.scene),
      animation: createAnimation.bind(this.scene),
    };
    this.create = {
      world: createWorld.bind(this.scene),
      player: createPlayer.bind(this.scene),
      enemy: createEnemy.bind(this.scene),
      animation: createAnimation.bind(this.scene),
      camera: createCamera.bind(this.scene),

      ui: {
        cursor: createCursor.bind(this.scene),
      },
    };
    this.update = {
      check: {
        characterZIndex: checkCharacterZIndex.bind(this.scene),
      },
    };
  }

  addListeners(event: string | symbol, callBack: () => void) {
    this.scene.input.on(event, callBack);
  }
}
