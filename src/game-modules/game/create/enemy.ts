import DefaultScene from '../../service/scenes/DefaultScene'
import CreateCharacter from './character'

export function createEnemy(
  this: DefaultScene,
  x: number,
  y: number,
  spriteSheet: string,
  textureFrame: string | number | undefined,
  origin?: number[]
) {
  return new CreateEnemy(this, x, y, spriteSheet, textureFrame, origin)
}

export default class CreateEnemy extends CreateCharacter {
  scene: DefaultScene

  constructor(
    scene: DefaultScene,
    x: number,
    y: number,
    spriteSheet: string,
    textureFrame: string | number | undefined,
    origin?: number[]
  ) {
    super(scene, x, y, spriteSheet, textureFrame, origin)
    this.scene = scene
  }
}
