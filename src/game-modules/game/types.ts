import CreatePlayer from "./create/player";
import World from "./create/world";

export interface PreloadTypes {
  method: string;
  data: any[];
}

export interface CursorBorderType {
  color: number;
  size: number;
}

export interface UI {
  cursor: (
    x: number,
    y: number,
    size: number,
    scale: number,
    background: number,

    border?: CursorBorderType | undefined
  ) => Phaser.GameObjects.Arc;
}
export interface CreateGameTypes {
  world: (
    showWorld: boolean,
    gridName: string,
    imgName: string,
    size: number,
    collisions?: number[]
  ) => World;
  player: (
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    origin?: number[]
  ) => CreatePlayer;
  animation: (config: AnimationConfig[]) => void;
  ui: UI;
}

export type ColliderObject =
  | Phaser.GameObjects.GameObject
  | Phaser.GameObjects.GameObject[]
  | Phaser.GameObjects.Group
  | Phaser.GameObjects.Group[];

export interface LoadGameTypes {
  preload: (data: PreloadTypes[]) => void;
}

export interface AddGameTypes {
  collision: (el_1: ColliderObject, el_2: ColliderObject) => void;
}

interface Ways {
  start: number;
  end: number;
}
export interface AnimationConfig {
  key: string;
  frame: {
    name: string;
    ways: Ways;
    frameRate: number;
    repeat: number;
  };
}

export interface SimpleObject {
  x: number;
  y: number;
  imgName: string;
  name: string;
}

export type Sides = "top" | "bottom" | "left" | "right" | "stop";
