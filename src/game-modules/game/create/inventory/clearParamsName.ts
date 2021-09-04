import { ShowItemParamElements } from "../../types";

export const clearParams = (params: ShowItemParamElements) => {
  //@ts-ignore
  const paramsArray: Phaser.GameObjects.Text[] = Object.values(params);

  paramsArray.forEach((text) => {
    text.setText("");
  });
};
