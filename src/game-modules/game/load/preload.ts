import { Scene } from "phaser";
import { PreloadTypes } from "../types";

export function preloadData(this: Scene, data: PreloadTypes[]) {
  data.forEach((unit) => {
    const { method, data } = unit;

    data.forEach((content) => {
      // @ts-ignore: Unreachable code error
      const result = this.load[method](...content);
    });
  });
}
