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

  // @ts-ignore: Unreachable code error
  return gridTileMap.createStaticLayer(0, gridTileSet, 0, 0); //createStaticLayer exists but is not described
}

export default class World {
  world: Phaser.Tilemaps.Tilemap;
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

  show() {
    console.log("🚀 ~> ", this);
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
