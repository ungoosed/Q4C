import overlay from './assets/images/overlay.png'
import healthBar from './assets/images/health.png'
import arrow from './assets/images/arrow.png'
import textBox from './assets/images/text.png'
export class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud' })
  }

  preload() {
    this.load.image('overlay', overlay)
    this.load.spritesheet('health', healthBar, { frameWidth: 53, frameHeight: 9 })
    this.load.image('arrow', arrow)
    this.load.image('textBox', textBox)
  }

  create() {
    this.arrow = this.add.image(this.cameras.main.centerX, 50, 'arrow').setScale(0.3)
    this.healthBar = this.add.sprite(150, 50, 'health', 5,).setScale(4)
    this.overlay = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'overlay').setScale(4)
    this.overlay.setScrollFactor(0, 0)
    this.healthBar.setScrollFactor(0, 0)
    this.healthBar.depth = 1
    this.arrow.depth = 15;
    this.eggPos;
    if (this.registry.get('tube') == 0) {
      this.eggPos = [3018, 512]
    } else {
      this.eggPos = [13157, 610]
    }
    this.target = Phaser.Math.Angle.Between(this.eggPos[0], this.eggPos[1], this.arrow.worldX, this.arrow.worldY);
    this.level = 0;
    this.dialogueLevel = 0;
    this.dialogueText = this.add.text(300, 450, 'testDialogue :: lol').setFontSize(20)
    this.levelText = this.add.text(600, 30, 'Level: Vagina').setFontSize(20)
  }

  update() {
    const that = this
    function dialogueCheck() {
      const playerY = that.registry.get('playerY');
      if (playerY >= 12400) {
      this.level = 0;
      this.levelText.setText('Level: Vagina')
      console.log('0')

    } else if (playerY >= 7474) {
      this.level = 1;
      this.levelText.setText('Level: Cervix')

      console.log('1')

      if (this.dialogueLevel == 0) {
        this.dialogueLevel = 1
        // this.dialogue(this.dialogueLevel)
      }
    } else if (playerY >= 905) {
      this.level = 2;
      this.levelText.setText('Level: Uterus')

      console.log('2')

      if (this.dialogueLevel == 1) {
        this.dialogueLevel = 2
        // this.dialogue(this.dialogueLevel)
      }
    } else {
      this.level = 3;
      this.levelText.setText('Level: Fallopian Tube')

      console.log('3')

      if (this.dialogueLevel == 2) {
        this.dialogueLevel = 3
        // this.dialogue(this.dialogueLevel)

      }
    }

    this.health = this.registry.get('health')
    if (this.health <= 10) {
      this.healthBar.setFrame(9)
    } else if (this.health <= 20) {
      this.healthBar.setFrame(8)

    } else if (this.health <= 30) {
      this.healthBar.setFrame(7)

    } else if (this.health <= 40) {
      this.healthBar.setFrame(6)

    } else if (this.health <= 50) {
      this.healthBar.setFrame(5)

    } else if (this.health <= 60) {
      this.healthBar.setFrame(4)
    } else if (this.health <= 70) {
      this.healthBar.setFrame(3)
    } else if (this.health <= 80) {
      this.healthBar.setFrame(2)
    } else if (this.health <= 90) {
      this.healthBar.setFrame(1)
    } else {
      this.healthBar.setFrame(0)
    }
  }
}
