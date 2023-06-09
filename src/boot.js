import random from "lodash.random"
export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' })
  }
  create() {
    const thisAlias = this;

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'title').setDepth(1).setScale(1)
    const easyButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'easy').setDepth(1).setScale(2).setDepth(2).setInteractive().setFrame(1)
    const mediumButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 140, 'medium').setDepth(1).setScale(2).setDepth(2).setInteractive().setFrame(1)
    const hardButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 180, 'hard').setDepth(1).setScale(2).setDepth(2).setInteractive().setFrame(1)

    this.registry.set('tube', random(1))

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 500, 'Loading..')
    
    easyButton.on('pointerover', function (event) {
      this.setFrame(0)

    });
    mediumButton.on('pointerover', function (event) {

      this.setFrame(0)

    });
    hardButton.on('pointerover', function (event) {

      this.setFrame(0)

    });

    easyButton.on('pointerout', function (event) {
      this.setFrame(1)

    });
    mediumButton.on('pointerout', function (event) {
      this.setFrame(1)

    });
    hardButton.on('pointerout', function (event) {
      this.setFrame(1)

    });
    easyButton.on('pointerup', function (event) {
      thisAlias.registry.set('difficulty', 1)
      thisAlias.scene.stop('boot')
      thisAlias.scene.start('before')
    });
    mediumButton.on('pointerup', function (event) {
      thisAlias.registry.set('difficulty', 2)

      thisAlias.scene.stop('boot')
      thisAlias.scene.start('before')
    });
    hardButton.on('pointerup', function (event) {
      thisAlias.registry.set('difficulty', 3)

      thisAlias.scene.stop('boot')
      thisAlias.scene.start('before')
    });

  }
}
