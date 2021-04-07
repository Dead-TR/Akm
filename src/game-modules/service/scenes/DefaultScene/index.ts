import { Scene } from "phaser";
import Game from "../../../game";
import CreatePlayer from "../../../game/create/player";
import World from "../../../game/create/world";
import { playerAnims } from "./configs/animations";
import { objects } from "./configs/objects";
import preloadData from "./configs/preloadData";

export default class DefaultScene extends Scene {
  engine: Game;
  player: CreatePlayer;
  world: World;

  state: {
    cursor?: Phaser.GameObjects.Arc;
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
    this.state.cursor = this.engine.create.ui.cursor(100, 100, 1, 25, 0xffffff);

    this.player = this.engine.create.player(64, 64, "playerUp", 1, [0.5, 0.8]);
    this.player.addAnimation(playerAnims);
    this.player.check();

    this.engine.add.collision(this.player.actor, this.world.world);

    this.engine.addListeners("pointerup", () => {});
  }
  update() {
    this.player.move(this.state.cursor);
  }
}
