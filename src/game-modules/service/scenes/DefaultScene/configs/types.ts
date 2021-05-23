import { AnimationConfig } from "../../../../game/types";

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

export interface EnemyAnimationTypes {
  movement: AnimationsListType;
  sword: string;
}

export interface EnemyListConfig {
  name: string;
  config: EnemyConfigUnit;
  animations: EnemyAnimationTypes;
}
