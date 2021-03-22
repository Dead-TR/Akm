import { Scene } from "phaser";
import Game from "../../game";

export default class ExampleScene extends Scene {
  constructor(config: string) {
    super(config);
    // this.engine = new Game(this);
  }

  preload() {
    // this.engine.create.createWorld(this);
  }
  create() {}
  update() {}
}
