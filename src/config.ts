import Phaser from 'phaser';
import {create, preload} from "./loader";

export default {
  title: 'Space Invaders',
  type: Phaser.AUTO,
  parent: 'space-invaders',
  backgroundColor: '#33A5E7',
  backgroundImage: 'assets/bg.png',
  scene: {
    preload: preload,
    create: create,
  },
  physics: {
    default: 'arcade'
  },
  arcade: {
    gravity: {
      y: 200
    }
  },
  scale: {
    width: 480,
    height: 853,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
