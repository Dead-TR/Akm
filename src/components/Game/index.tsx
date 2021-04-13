import React, { useEffect, useLayoutEffect } from "react";
import { renderGame } from "../../game-modules";
import css from "./style.module.scss";

let game: Phaser.Game | null = null;

export const Game = () => {
  useLayoutEffect(() => {
    game = renderGame();
  }, []);

  useEffect(() => {
    return () => {
      game?.destroy(true, true);
    };
  }, []);

  return (
    <div>
      <div id="game-box"></div>
    </div>
  );
};
