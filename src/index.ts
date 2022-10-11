import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import StartScene from "./scenes/Start";

new Phaser.Game(
  Object.assign(config, {
    scene: [StartScene, GameScene]
  })
);
