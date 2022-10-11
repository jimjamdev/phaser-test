import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const bg = this.add.image(240, 426, 'bg');
    bg.setDepth(0);
    const logo = this.add.image(240, 220, 'logo');
    logo.setScale(0.45);

    // Bullets
    const bullets = this.add.group();

    // Aliens
    this.add.image(240, 100, 'invaderYellow');


    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}
