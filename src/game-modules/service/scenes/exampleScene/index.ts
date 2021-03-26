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
    this.engine.load.preload(this, preloadData);
  }
  create() {
    this.engine.create.world(this, true, "exampleGrid", "exampleGrassTile", 32);
  }
  update() {}
}

const a = (b: number, g: number) => {
  return b + g;
};
