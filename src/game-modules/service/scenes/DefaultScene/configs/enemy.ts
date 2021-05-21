import DefaultScene from '..'
import { enemyList } from './config'

export default function enemy(scene: DefaultScene) {
  enemyList.forEach((unit) => {
    const { name, config } = unit
    scene.enemy[name] = scene.engine.create.enemy(
      config.x,
      config.y,
      config.spriteSheet,
      config.textureFrame,
      config.origin
    )
  })
}
