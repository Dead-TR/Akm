import { EnemyListConfig } from './types'

export const collisionCellIds = [0, 2, 3, 4, 5, 7, 8, 9, 10]

export const enemyList: EnemyListConfig[] = [
  {
    name: 'testEnemy',
    config: {
      x: 300,
      y: 300,
      spriteSheet: 'playerDown',
      textureFrame: 1,
      origin: [0.5, 0.8],
    },
  },
]
