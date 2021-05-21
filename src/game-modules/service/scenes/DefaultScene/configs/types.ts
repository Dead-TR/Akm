export interface EnemyConfigUnit {
  x: number
  y: number
  spriteSheet: string
  textureFrame: string | number | undefined
  origin?: number[]
}

export interface EnemyListConfig {
  name: string
  config: EnemyConfigUnit
}
