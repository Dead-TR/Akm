import { Scene } from "phaser";

import Game from "../../../game";
import { CreateEnemy } from "../../../game/create";
import CreatePlayer from "../../../game/create/player";
import World from "../../../game/create/world";

import { animationList } from "./configs/animations";
import { collisionCellIds } from "./configs/config";
import enemyCreator, {
  movementWatching as enemyMovement,
  setDeath,
} from "./configs/enemy";
import { objects } from "./configs/objects";
import preloadData from "./configs/preloadData";

export default class DefaultScene extends Scene {
  engine: Game;
  player: CreatePlayer;
  world: World;
  enemy: CreateEnemy[] = [];

  state: {
    cursor?: Phaser.GameObjects.Arc;
    camera?: Phaser.Cameras.Scene2D.Camera;
  };

  constructor(config: string) {
    super(config);
    this.engine = new Game(this);
    this.state = {};
  }

  preload() {
    this.engine.load.preload(preloadData);
  }
  create() {
    this.engine.load.animation(animationList);
    this.world = this.engine.create.world(
      true,
      "exampleGrid",
      "exampleGrassTile",
      32
    );
    this.world.addSimpleObjects(objects);

    this.player = this.engine.create.player(64, 64, "playerUp", 1, {
      origin: [0.5, 0.8],
      animation: {
        movement: {
          left: "playerGoLeft",
          right: "playerGoRight",
          top: "playerGoUp",
          bottom: "playerGoDown",
        },
        sword: "sword_1Fight",
      },
    });
    enemyCreator(this);

    this.state.camera = this.engine.create.camera(
      this.player.actor,
      this.world.world
    );

    this.state.cursor = this.engine.create.ui.cursor(
      100,
      100,
      1,
      25,
      0xffffff,
      null,
      this.state.camera
    );

    this.engine.addListeners("pointerup", () => {});
  }
  update() {
    this.player.move(this.state.cursor, this.world.world, collisionCellIds);

    this.engine.update.check.characterZIndex([
      this.player,
      ...Object.values(this.enemy),
    ]);

    enemyMovement(this);
    setDeath(this);
  }
}
