import { Scene } from "phaser";
import Game from "../../game";

export default class ExampleScene extends Scene {
  constructor() {
    super();
    this.engine = new Game(this);
  }

  preload() {
    this.engine.create.createWorld(this);
  }
  create() {}
  update() {}
}
