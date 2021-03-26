import { Scene } from "phaser";

export default function createWorld(
  scene: Scene,
  showWorld: boolean,
  grid: string, //gridName
  img: string, //imgName
  size: number
) {
  const gridTileMap = scene.make.tilemap({
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
