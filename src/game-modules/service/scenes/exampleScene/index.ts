import { Scene } from "phaser";
import Game from "../../../game";
import preloadData from "./preloadData";

export default class ExampleScene extends Scene {
  engine: Game;

  constructor(config: string) {
    super(config);
    this.engine = new Game(this);
  }

  preload() {
    this.engine.load.preload(preloadData);
  }
  create() {
    this.engine.create.world(true, "exampleGrid", "exampleGrassTile", 32);
  }
  update() {}
}
