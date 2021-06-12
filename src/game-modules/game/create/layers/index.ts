import { Scene } from "phaser";
import { LayersType } from "../../types";

export function createLayers(this: Scene): LayersType {
  return {
    ui: this.add.layer().setDepth(2),
    gameElements: {
      characters: this.add.layer().setDepth(1),
    },
  };
}
