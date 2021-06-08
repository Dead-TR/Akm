import { CreateCharacter, CreateEnemy, CreatePlayer, World } from "./create";

export type CharactersPosterity = CreateCharacter | CreateEnemy | CreatePlayer;

export interface PreloadTypes {
  method: keyof Phaser.Loader.LoaderPlugin;
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
    params: {
      origin?: number[];
      animation: CharacterAnimationsList;
    }
  ) => CreatePlayer;
  enemy: (
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    animations: EnemyAnimationsList,
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

export interface UpdateGameTypes {
  check: {
    characterZIndex: (characters: CharactersPosterity[]) => void;
  };
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
  sword: Phaser.GameObjects.Sprite | null;
  enemy: CharactersPosterity | null;
  target: {
    goingFix?: {
      x: number;
      y: number;
    };
  };

  fight: {
    coolDown: number;
    health: number;
  };
}

export interface CharacterElements {
  healthLine: Phaser.GameObjects.Graphics | null;
}

export interface EnemyConfigUnit {
  x: number;
  y: number;
  spriteSheet: string;
  textureFrame: string | number | undefined;
  origin?: number[];
}

export interface AnimationsListType {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

export interface CharacterAnimationsList {
  movement: AnimationsListType;
  sword: string;
}

export interface EnemyAnimationsList extends CharacterAnimationsList {}

export interface EnemyListConfig {
  name: string;
  config: EnemyConfigUnit;
  animations: EnemyAnimationsList;
}
