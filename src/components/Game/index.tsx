import React, { useEffect, useLayoutEffect, useState } from "react";
import { renderGame } from "../../game-modules";
import css from "./style.module.scss";

export const Game = () => {
  const [game, setGame] = useState<Phaser.Game>();

  useLayoutEffect(() => {
    setGame(renderGame());
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
