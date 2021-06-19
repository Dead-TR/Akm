import { Scene } from "phaser";

export function createCells(scene: Scene) {
  const rowWidth = 5,
    rowHeight = 8;
  const cells: Phaser.GameObjects.Graphics[] = [];
  let yAmount = 0;
  for (let index = 1; index <= rowWidth * rowHeight; index++) {
    let x = 50;

    switch (index % rowWidth) {
      case 1:
        x *= 1;
        yAmount++;
        break;

      case 0:
        x *= rowWidth;
        break;

      default:
        x *= index % rowWidth;
        break;
    }

    cells.push(createCell(scene, x, yAmount * 50));
  }

  return cells;
}
export function createCell(scene: Scene, x: number, y: number) {
  var cell = scene.add.graphics();
  cell.lineStyle(2, 0x118eb3);
  cell.strokeRect(0, 0, 40, 40);
  cell.x = x;
  cell.y = y;

  return cell;
}
