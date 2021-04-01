import React, { useMemo } from "react";
import { game } from "../../game-modules";
import css from "./style.module.scss";

export const Game = () => {
  const prj = useMemo(() => game, []);

  return (
    <div>
      <div id="game-box"></div>
    </div>
  );
};
