import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const bg = this.add.image(240, 426, 'bg');
    bg.setDepth(0);

    // Bullets
    const bullets = this.add.group();

    // Aliens
    const alien = this.add.image(240, 100, 'alienOrange');
    alien.setScale(0.2);


    this.tweens.add({
      targets: alien,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}
