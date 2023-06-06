import gif from './assets/images/funnygif.png'
import deadSperm from './assets/images/deadSperm.png'
export class Dead extends Phaser.Scene {
  constructor() {
    super({ key: 'dead' })
  }

  preload() {
    this.load.spritesheet('funny', gif, { frameWidth: 800, frameHeight: 600 })
    this.load.image('death', deadSperm)
  }

  create() {
    const sperm = this.add.image(50, 100, "death")
    sperm.setScale(5);
    const funnygif = this.add.sprite(this.cameras.main.centerX + 250, this.cameras.main.centerY - 200, 'funny').setScale(0.3)
    funnygif.anims.create({
      key: 'lol',
      frames: funnygif.anims.generateFrameNumbers('funny', { start: 0, end: 20 }),
      frameRate: 10,
      repeat: -1
    }
    )
    funnygif.anims.play('lol')
    this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY - 200, 'YOU DIED >:(', { fontSize: 40 })
    this.add.text(this.cameras.main.centerX - 150, this.cameras.main.centerY - 100, 'Continue in 5 seconds . . .', { fontSize: 25 })

    setTimeout(() => {
      this.scene.stop('dead')

      this.scene.start('boot')

    }, 5000);

  }
  update() {

  }
}
