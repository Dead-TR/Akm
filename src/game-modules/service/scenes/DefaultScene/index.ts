import { Scene } from "phaser";
import Game from "../../../game";
import CreatePlayer from "../../../game/create/player";
import World from "../../../game/create/world";
import cursorMove from "./callBacks/cursorMove";
import { playerAnims } from "./configs/animations";
import { objects } from "./configs/objects";
import preloadData from "./configs/preloadData";

export default class DefaultScene extends Scene {
  engine: Game;
  player: CreatePlayer;
  world: World;

  constructor(config: string) {
    super(config);
    this.engine = new Game(this);
  }

  preload() {
    this.engine.load.preload(preloadData);
  }
  create() {
    this.world = this.engine.create.world(
      true,
      "exampleGrid",
      "exampleGrassTile",
      32
    );
    this.world.addSimpleObjects(objects);
    this.player = this.engine.create.player(64, 64, "playerUp", 1);
    this.player.addAnimation(playerAnims);
    this.player.check();

    this.engine.addListeners("pointerup", () => {
      cursorMove(this.world.objects["cursor"], this.input.x, this.input.y);
    });
  }
  update() {
    this.player.move();
  }
}
