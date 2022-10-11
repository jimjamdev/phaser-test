import Phaser from 'phaser';
import {AssetType, SoundType} from "../interface/assets";
import {GameState} from "../interface/game-state";
import {AssetManager} from "../interface/manager/asset-manager";
import {AnimationFactory} from "../interface/factory/animation-factory";
import {ScoreManager} from "../interface/manager/score-manager";
import {AlienManager} from "../interface/manager/alien-manager";

export default class StartScene extends Phaser.Scene {
    state: GameState;
    assetManager: AssetManager;
    animationFactory: AnimationFactory;
    scoreManager: ScoreManager;
    bulletTime = 0;
    firingTimer = 0;
    starfield: Phaser.GameObjects.TileSprite;
    player: Phaser.Physics.Arcade.Sprite;
    alienManager: AlienManager;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    fireKey: Phaser.Input.Keyboard.Key;
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
        this.load.audio(SoundType.Music, '/audio/synthwave.mp3');
    }

    create() {
        // State
        this.state = GameState.Playing;
        // Audio
        const music = this.sound.add('music');
        music.play({ loop: true });

        // Images
        const logo = this.add.image(240, 0, 'logo');
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
