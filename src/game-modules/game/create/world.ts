import { Scene } from "phaser";
import { SimpleObject } from "../types";
export function creator(
  this: Scene,
  showWorld: boolean,
  gridName: string,
  imgName: string,
  size: number
) {
  const gridTileMap = this.make.tilemap({
    key: gridName,
    tileHeight: size,
    tileWidth: size,
  });

  const gridTileSet = showWorld
    ? gridTileMap.addTilesetImage(imgName, undefined, size, size)
    : null;

  // @ts-ignore
  const tileLayer = gridTileMap.createStaticLayer(0, gridTileSet, 0, 0); //createStaticLayer exists but is not described

  return tileLayer;
}

export default class World {
  world: any;
  scene: Scene;
  objects: {
    [key: string]: Phaser.GameObjects.Image;
  };

  constructor(
    scene: Scene,
    showWorld: boolean,
    gridName: string,
    imgName: string,
    size: number
  ) {
    this.scene = scene;
    this.world = creator.call(scene, showWorld, gridName, imgName, size);
    this.objects = {};
  }

  addSimpleObjects(configs: SimpleObject[]) {
    configs.forEach((config) => {
      const { x, y, imgName, name } = config;
      this.objects[name] = this.scene.add.image(x, y, imgName);
    });
  }
}

export function createWorld(
  this: Scene,
  showWorld: boolean,
  gridName: string,
  imgName: string,
  size: number
) {
  return new World(this, showWorld, gridName, imgName, size);
}
