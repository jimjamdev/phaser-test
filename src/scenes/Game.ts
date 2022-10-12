import Phaser from 'phaser';
import {GameState} from "../interface/game-state";
import {AssetManager} from "../interface/manager/asset-manager";
import {AnimationFactory} from "../interface/factory/animation-factory";
import {ScoreManager} from "../interface/manager/score-manager";
import {AlienManager} from "../interface/manager/alien-manager";
import {AssetType} from "../interface/assets";
import {Ship} from "../interface/ship";

export default class GameScene extends Phaser.Scene {
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
    this.starfield = this.add
        .tileSprite(0, 0, 480, 853, AssetType.Starfield)
        .setOrigin(0, 0)
        .setDepth(1)
        .setAlpha(0.15)
        .setBlendMode(Phaser.BlendModes.MULTIPLY);

    this.add.image(240, 426, 'bg').setDepth(0);

    this.assetManager = new AssetManager(this);
    this.animationFactory = new AnimationFactory(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.player = Ship.create(this);
    this.alienManager = new AlienManager(this);
    this.scoreManager = new ScoreManager(this);
  }
}
