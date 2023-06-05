import random from "lodash.random"
import { Level } from "./level"
import { Hud } from "./hud"
import titleImage from './assets/images/title.png'
import startImage from './assets/images/start.png'
import { Dead } from "./death"
export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' })
  }
  preload() {
    this.load.image('title', titleImage)
    this.load.spritesheet('start', startImage, { frameWidth: 69, frameHeight: 19 })

  }
  create() {
    const sceneAlias = this.scene;

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'title').setDepth(1).setScale(1)
    const startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'start').setDepth(1).setScale(2).setDepth(2).setInteractive();

    this.registry.set('tube', random(1))

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 500, 'Loading..')
    startButton.on('pointerover', function (event) {

      this.setFrame(1)

    });

    startButton.on('pointerout', function (event) {
      this.setFrame(0)

    });
    startButton.on('pointerup', function (event) {
      sceneAlias.stop('boot')
      sceneAlias.start('level')
      sceneAlias.start('hud')
      sceneAlias.bringToTop('hud')
    });

  }
}
