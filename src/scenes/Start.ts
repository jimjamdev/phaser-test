import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('orb', 'assets/images/glow-orb.png')
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.spritesheet('invader', 'assets/images/invader.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('alienYellow', 'assets/images/alien-yellow.png');
        this.load.image('alienPink', 'assets/images/alien-pink.png');
        this.load.image('alienBlue', 'assets/images/alien-blue.png');
        this.load.image('alienOrange', 'assets/images/alien-orange.png');
        this.load.image('alienGreen', 'assets/images/alien-green.png');
        this.load.audio('introWave', 'assets/audio/warp.mp3');
        this.load.audio('synthWave', 'assets/audio/synthwave.mp3');
    }


    create() {
        // Audio
        const music = this.sound.add('synthWave');
        music.play( );

        // Images
        const logo = this.add.image(240, 220, 'logo');
        const bg = this.add.image(240, 426, 'bg');

        // Button
        const playButton = this.add.text(190, 500, 'PLAY', { fill: '#0f0', backgroundColor: '#000', padding: 10, borderRadius: 10, fixedWidth: 100, align: 'center' });
        playButton.setInteractive();
        playButton.on('pointerdown', () => this.scene.start('GameScene'));

        // BG
        bg.setDepth(0);

        // Logo
        logo.setDepth(1)
        logo.setScale(0.45);
    }
}
