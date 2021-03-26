import { Scene } from "phaser";
import { PreloadTypes } from "../../service/serviceTypes";

export const preloadData = (scene: Scene, data: PreloadTypes[]) => {
  data.forEach((unit) => {
    const { method, data } = unit;

    // @ts-ignore: Unreachable code error
    scene.load[method](...data);
  });
};
