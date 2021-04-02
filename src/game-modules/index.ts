import Phaser from "phaser";

import { config } from "./service/config";

export const renderGame = () => new Phaser.Game(config);
