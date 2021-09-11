import { ItemParams } from "../../types";
import CreatePlayer from "../player";

export function setUserParams(
  player: CreatePlayer,
  itemParams: ItemParams,
  operation: "clear" | "set"
) {
  for (const key in itemParams) {
    //@ts-ignore
    const value: number = itemParams[key];

    const { params, skills } = player;
    switch (key) {
      case "attack":
        params.attack = operation !== "clear" && value ? value : skills.attack;
        break;

      case "defence":
        params.armor = operation !== "clear" && value ? value : skills.armor;
        break;

      case "hp":
        params.health = operation !== "clear" && value ? value : skills.health;
        break;

      case "speed":
        params.speed = operation !== "clear" && value ? value : skills.speed;
        break;

      case "coolDown":
        params.coolDown =
          operation !== "clear" && value ? value : skills.coolDown;
        break;
      default:
        break;
    }
  }
}
