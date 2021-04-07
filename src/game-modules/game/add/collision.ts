import { Scene } from "phaser";
import { ColliderObject } from "../types";

export default function addCollision(
  this: Scene,
  el_1: ColliderObject,
  el_2: ColliderObject
) {
  this.physics.add.collider(el_1, el_2);
}
