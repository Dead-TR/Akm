import {
  createAnimation,
  createCamera,
  createCursor,
  createEnemy,
  createPlayer,
  createWorld,
} from "./create";
import {
  CreateGameTypes,
  LayersType,
  LoadGameTypes,
  UpdateGameTypes,
} from "./types";
import { preloadData } from "./load/preload";
import DefaultScene from "../service/scenes/DefaultScene";
import { checkCharacterZIndex } from "./update";
import { createInventory } from "./create/inventory";
import { createLayers } from "./create/layers";
import { addCharactersToLayer } from "./create/layers/addCharacters";
import { addSpriteToLayer } from "./create/layers/addUi";

export default class Game {
  scene: DefaultScene;
  load: LoadGameTypes;
  create: CreateGameTypes;
  update: UpdateGameTypes;

  layers: LayersType | undefined;

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
      inventory: createInventory.bind(this.scene),
      layers: createLayers.bind(this.scene),

      addToLayer: {
        characters: addCharactersToLayer.bind(this.scene),
        sprites: addSpriteToLayer.bind(this.scene),
      },
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
