import { Scene } from "phaser";
import { PreloadTypes } from "../types";

export function preloadData(this: Scene, data: PreloadTypes[]) {
  data.forEach((unit) => {
    const { method, data } = unit;

    // @ts-ignore: Unreachable code error
    this.load[method](...data);
  });
}
