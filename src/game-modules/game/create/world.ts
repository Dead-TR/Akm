import { Scene } from "phaser";

export default function createWorld(
  this: Scene,
  showWorld: boolean,
  grid: string, //gridName
  img: string, //imgName
  size: number
) {
  const gridTileMap = this.make.tilemap({
    key: grid,
    tileHeight: size,
    tileWidth: size,
  });

  const gridTileSet = showWorld
    ? gridTileMap.addTilesetImage(img, undefined, size, size)
    : null;

  // @ts-ignore: Unreachable code error
  const gridLayer = gridTileMap.createStaticLayer(0, gridTileSet, 0, 0); //createStaticLayer exists but is not described
}
