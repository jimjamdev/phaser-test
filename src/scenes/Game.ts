import Phaser from 'phaser';
import {GameState} from "../interface/game-state";
import {AssetManager} from "../interface/manager/asset-manager";
import {AnimationFactory, AnimationType} from "../interface/factory/animation-factory";
import {ScoreManager} from "../interface/manager/score-manager";
import {AlienManager} from "../interface/manager/alien-manager";
import {AssetType, SoundType} from "../interface/assets";
import {Ship} from "../interface/ship";
import {Bullet} from "../interface/bullet";
import {EnemyBullet} from "../interface/enemy-bullet";
import {Kaboom} from "../interface/kaboom";
import {Alien} from "../interface/alien";

export default class GameScene extends Phaser.Scene {
  speed = 200;
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
    super('GameScene');
  }

  create() {
    // State
    this.state = GameState.Playing;
    this.add.image(240, 426, AssetType.Bg).setDepth(0);
    this.add.image(480, 853, AssetType.Starfield)
        .setOrigin(0, 0)
        .setDepth(1)
        .setAlpha(0.15)
        .setBlendMode(Phaser.BlendModes.MULTIPLY);

    this.assetManager = new AssetManager(this);
    this.animationFactory = new AnimationFactory(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.player = Ship.create(this);
    this.alienManager = new AlienManager(this);
    this.scoreManager = new ScoreManager(this);

    this.fireKey.on("down", () => {
      switch (this.state) {
        case GameState.Win:
        case GameState.GameOver:
          this.restart();
          break;
      }
    })
  }

  update() {
    this._shipKeyboardHandler();
    if (this.time.now > this.firingTimer) {
      this._enemyFires();
    }

    this.physics.overlap(
        this.assetManager.bullets,
        this.alienManager.aliens,
        this._bulletHitAliens,
        null,
        this
    );
    this.physics.overlap(
        this.assetManager.enemyBullets,
        this.player,
        this._enemyBulletHitPlayer,
        null,
        this
    );
  }

  private _shipKeyboardHandler() {
    let playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setVelocity(0, 0);
    if (this.cursors.left.isDown) {
      playerBody.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      playerBody.setVelocityX(200);
    }

    if (this.fireKey.isDown) {
      this._fireBullet();
    }
    if (this.input.activePointer.isDown) {
      this._fireBullet();
      const movePosition = this.input.activePointer.position.x < 240 ? -200 : 200;
      playerBody.setVelocityX(movePosition);
    }
  }

  private _bulletHitAliens(bullet: Bullet, alien: Alien) {
    let explosion: Kaboom = this.assetManager.explosions.get();
    bullet.kill();
    alien.kill(explosion);
    this.scoreManager.increaseScore();
    if (!this.alienManager.hasAliveAliens) {
      this.scoreManager.increaseScore(1000);
      this.scoreManager.setWinText();
      this.state = GameState.Win;
    }
  }

  private _enemyBulletHitPlayer(ship, enemyBullet: EnemyBullet) {
    let explosion: Kaboom = this.assetManager.explosions.get();
    enemyBullet.kill();
    let live: Phaser.GameObjects.Sprite = this.scoreManager.lives.getFirstAlive();
    if (live) {
      live.setActive(false).setVisible(false);
    }

    explosion.setPosition(this.player.x, this.player.y);
    explosion.play(AnimationType.Kaboom);
    this.sound.play(SoundType.Kaboom)
    if (this.scoreManager.noMoreLives) {
      this.scoreManager.setGameOverText();
      this.assetManager.gameOver();
      this.state = GameState.GameOver;
      this.player.disableBody(true, true);
    }
  }

  private _enemyFires() {
    if (!this.player.active) {
      return;
    }
    let enemyBullet: EnemyBullet = this.assetManager.enemyBullets.get();
    let randomEnemy = this.alienManager.getRandomAliveEnemy();
    if (enemyBullet && randomEnemy) {
      enemyBullet.setPosition(randomEnemy.x, randomEnemy.y);
      this.physics.moveToObject(enemyBullet, this.player, 120);
      this.firingTimer = this.time.now + 2000;
    }
  }

  private _fireBullet() {
    if (!this.player.active) {
      return;
    }

    if (this.time.now > this.bulletTime) {
      let bullet: Bullet = this.assetManager.bullets.get();
      if (bullet) {
        bullet.shoot(this.player.x, this.player.y - 18);
        this.bulletTime = this.time.now + 200;
      }
    }
  }

  restart() {
    this.state = GameState.Playing;
    this.player.enableBody(true, this.player.x, this.player.y, true, true);
    this.scoreManager.resetLives();
    this.scoreManager.hideText();
    this.alienManager.reset();
    this.assetManager.reset();
  }

}
