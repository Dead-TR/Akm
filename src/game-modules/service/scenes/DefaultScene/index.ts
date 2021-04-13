import { Scene } from "phaser";
import Game from "../../../game";
import CreatePlayer from "../../../game/create/player";
import World from "../../../game/create/world";
import { playerAnims } from "./configs/animations";
import { collisionCellIds } from "./configs/config";
import { objects } from "./configs/objects";
import preloadData from "./configs/preloadData";

export default class DefaultScene extends Scene {
  engine: Game;
  player: CreatePlayer;
  world: World;

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
    this.world = this.engine.create.world(
      true,
      "exampleGrid",
      "exampleGrassTile",
      32,
      [0]
    );
    this.world.addSimpleObjects(objects);

    this.player = this.engine.create.player(64, 64, "playerUp", 1, [0.5, 0.8]);
    this.player.addAnimation(playerAnims);
    this.player.check();

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
  }
}
