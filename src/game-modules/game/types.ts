import {
  CreateCharacter,
  CreateEnemy,
  CreatePlayer,
  World,
  Inventory,
} from "./create";

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
interface AddLayers {
  characters: (
    characters: CharactersPosterity[],
    layer: Phaser.GameObjects.Layer
  ) => void;
  sprites: (
    element: LayerElementType[] | LayerElementType,
    layer: Phaser.GameObjects.Layer
  ) => void;
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
      inventory: string;
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
  inventory: (params: CreateInventorySettings) => Inventory;
  layers: () => LayersType;

  addToLayer: AddLayers;
  ui: UI;
}

export interface LayersType {
  ui: Phaser.GameObjects.Layer;
  gameElements: {
    characters: Phaser.GameObjects.Layer;
  };
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
  target: {};

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

export interface OptionalCollisionParams {
  characters: CharactersPosterity[];
}

export interface CreateInventorySettings {
  img: string;
}

export interface InventoryParams {
  uiButton?: Phaser.GameObjects.Sprite;
  background: Phaser.GameObjects.Sprite;
  mask: Phaser.Display.Masks.GeometryMask;
  container: Phaser.GameObjects.Container;
}

export type InventoryStatuses = "close" | "open" | "barter";
export type LayerElementType =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Sprite;

export interface ItemParams {
  defence?: number;
  attack?: number;
  speed?: number;
  hp?: number;
}

export interface Item {
  img: string;
  name: string;
  slot: ItemSlots;
  price: number;

  params?: ItemParams;

  message?: string;
}

export interface ItemBody extends Phaser.GameObjects.Sprite {
  params: Item;
}

export interface ItemBox {
  img: Phaser.GameObjects.Sprite;
  list: Item[];
}

export type ItemSlots = "arm" | "body" | "leg" | "sword" | "other";

export interface ShowItemParamElements {
  defence?: Phaser.GameObjects.Text;
  attack?: Phaser.GameObjects.Text;
  speed?: Phaser.GameObjects.Text;
  hp?: Phaser.GameObjects.Text;
}
