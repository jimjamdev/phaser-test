import Phaser from 'phaser';
import {AssetType, SoundType} from "../interface/assets";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.setBaseURL("/assets");
        this.load.image(AssetType.Bg, '/images/bg.png');
        this.load.image(AssetType.Logo, '/images/logo.png');
        this.load.image(AssetType.EnemyBullet, '/images/glow-orb.png')
        this.load.image(AssetType.Bullet, '/images/bullet.png');
        this.load.spritesheet(AssetType.Alien, '/images/invader.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image(AssetType.Ship, '/images/player.png');
        this.load.image(AssetType.Kaboom, '/images/explosion.png');
        this.load.image(AssetType.Starfield, '/images/starfield.jpg');
        this.load.audio(SoundType.Music, '/audio/synthwave.mp3');
    }

    create() {
        // Audio
        const music = this.sound.add('music');
        music.play({ loop: true });

        // Images
        const bg = this.add.image(240, 426, 'bg').setDepth(0);
        const logo = this.add.image(240, 0, 'logo').setDepth(1).setScale(0.45);

        // Button
        const playButton = this.add.text(190, 500, 'PLAY', { fill: '#0f0', backgroundColor: '#000', padding: 10, borderRadius: 10, fixedWidth: 100, align: 'center' });
        playButton.setInteractive();
        playButton.on('pointerdown', () => this.scene.start('GameScene'));

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1500,
            ease: 'Sine.out',
            yoyo: false,
            repeat: 0
        });
    }
}
