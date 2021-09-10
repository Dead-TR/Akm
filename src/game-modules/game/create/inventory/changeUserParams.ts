import { ItemParams } from "../../types";
import CreatePlayer from "../player";

const playerDefaultParams = {
  health: 10,
  armor: 0,
  attack: 1,
  coolDown: 20,
  speed: 100,
};

export function setUserParams(
  player: CreatePlayer,
  itemParams: ItemParams,
  operation: "clear" | "set"
) {
  for (const key in itemParams) {
    //@ts-ignore
    const value: number = itemParams[key];

    const { params } = player;
    switch (key) {
      case "attack":
        params.attack =
          operation === "clear" ? playerDefaultParams.attack : value;
        break;
      case "defence":
        params.armor =
          operation === "clear" ? playerDefaultParams.armor : value;
        break;
      case "hp":
        params.health =
          operation === "clear" ? playerDefaultParams.health : value;

        break;
      case "speed":
        params.speed =
          operation === "clear" ? playerDefaultParams.speed : value;

        break;

      default:
        break;
    }
  }
}
