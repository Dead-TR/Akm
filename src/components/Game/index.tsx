import React from "react";
import { game } from "../../game-modules";
import css from "./style.module.scss";

export const Game = () => {
  const project = game;

  return (
    <div>
      <div id="game-box"></div>
    </div>
  );
};
