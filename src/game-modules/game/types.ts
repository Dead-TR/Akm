import { EnemyAnimationTypes } from "../service/scenes/DefaultScene/configs/types";
import { CreateEnemy, CreatePlayer, World } from "./create";

export interface PreloadTypes {
  method: keyof Phaser.Loader.LoaderPlugin;
  data: any[];
}

export interface CursorBorderType {
  color: number;
  size: number;
}

export interface EnemyListType {
  [name: string]: CreateEnemy;
}

export interface UI {
  cursor: (
    x: number,
    y: number,
    size: number,
    scale: number,
    background: number,

    border?: CursorBorderType | undefined | null,
    camera?: Phaser.Cameras.Scene2D.Camera
  ) => Phaser.GameObjects.Arc;
}
export interface CreateGameTypes {
  world: (
    showWorld: boolean,
    gridName: string,
    imgName: string,
    size: number
  ) => World;
  player: (
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    origin?: number[]
  ) => CreatePlayer;
  enemy: (
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    animations: EnemyAnimationTypes,
    params?: {
      origin?: number[];
      vision?: number;
      speed?: number;
    }
  ) => CreateEnemy;
  animation: (config: AnimationConfig[]) => void;
  camera: (
    actor: Phaser.GameObjects.GameObject | Object,
    world: any
  ) => Phaser.Cameras.Scene2D.Camera;

  ui: UI;
}

export type ColliderObject =
  | Phaser.GameObjects.GameObject
  | Phaser.GameObjects.GameObject[]
  | Phaser.GameObjects.Group
  | Phaser.GameObjects.Group[];

export interface LoadGameTypes {
  preload: (data: PreloadTypes[]) => void;
  animation: (config: AnimationConfig[]) => void;
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

export interface MortalTypes {
  isActive: boolean;
  sword: Phaser.GameObjects.Sprite | null;
}
