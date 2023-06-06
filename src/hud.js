import overlay from './assets/images/overlay.png'
import healthBar from './assets/images/health.png'
import arrow from './assets/images/arrow.png'
import textBox from './assets/images/text.png'
import no from './assets/images/xmark.png'
import yes from './assets/images/checkmark.png'
import next from './assets/images/next.png'

export class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud' })
  }

  preload() {
    function loadFont(name, url) {
      var newFont = new FontFace(name, `url(${url})`);
      newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
      }).catch(function (error) {
        return error;
      });
    }
    this.load.image('overlay', overlay)
    this.load.spritesheet('health', healthBar, { frameWidth: 53, frameHeight: 9 })
    this.load.image('arrow', arrow)
    this.load.image('next', next)

    this.load.image('yes', yes)
    this.load.image('no', no)
    this.load.image('box', textBox)
    loadFont('Mainport', './src/assets/fonts/Mainport.ttf')
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
    this.levelText = this.add.text(600, 30, 'Level: Vagina', { fontFamily: 'Mainport' }).setFontSize(20)

    this.level = 0;

    this.registry.set('dlevel', this.dialogueLevel)

    this.dialogue = this.add.group()

    this.box = this.add.image(this.cameras.main.centerX, 590, 'box').setScale(6.2).setOrigin(0.5, 0.5).setDepth(0)
    this.yes = this.add.image(this.cameras.main.width - 50, 540, 'yes').setScale(2).setDepth(3).setInteractive()
    this.next = this.add.image(this.cameras.main.width - 50, 540, 'next').setScale(2).setDepth(3).setInteractive()
    this.dialogueText = this.add.text(30, 420, 'if you see this you are bad and should tell kamikid right away', {
      lineSpacing: 5,
      fontSize: 24,
      fontFamily: 'Mainport',
      align: "left",
      wordWrap: { width: 690 }
      
    }).setFontSize(20).setDepth(2)
    this.dialogueLevel = 0;

    this.dialogue.add(this.dialogueText)
    this.dialogue.add(this.yes)
    this.dialogue.add(this.next)
    this.dialogue.add(this.box)

    this.dialogue.setVisible(false)

    this.next.on('pointerup', () =>{
      this.dialogueLevel = this.dialogueLevel + 1
    })
    this.yes.on('pointerup', () =>{
      this.dialogueLevel = this.dialogueLevel + 1
      this.dialogue.setVisible(false)
      this.scene.resume('level')
    })
    
  }

  update() {
    this.registry.set('dlevel', this.dialogueLevel)
    function dialogueCheck(that) {
      const dlevel = that.registry.get('dlevel')
      const playerY = that.registry.get('playerY');
      if (dlevel == 0) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('The testes are the starting point of the Sperm\'s adventure. They are encased inside the scrotum to help protect it. The testes are responsible for prducing Sperm and testosterone. If we take closer look into the testes we can see the seminiferous tubules at work producing sperm.')
      }
      if (dlevel == 1) {
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('With the help of Testosterone, the Sperm gains the endurance and strength to overcome the obstacles in its journey! After the Sperm is produced they make their way to the epididymis where they develop and mature, waiting until their time has come to begin their epic journey.')
      }
      

    }
    function healthCheck(that) {
      that.health = that.registry.get('health')
      if (that.health <= 10) {
        that.healthBar.setFrame(9)
      } else if (that.health <= 20) {
        that.healthBar.setFrame(8)

      } else if (that.health <= 30) {
        that.healthBar.setFrame(7)

      } else if (that.health <= 40) {
        that.healthBar.setFrame(6)

      } else if (that.health <= 50) {
        that.healthBar.setFrame(5)

      } else if (that.health <= 60) {
        that.healthBar.setFrame(4)
      } else if (that.health <= 70) {
        that.healthBar.setFrame(3)
      } else if (that.health <= 80) {
        that.healthBar.setFrame(2)
      } else if (that.health <= 90) {
        that.healthBar.setFrame(1)
      } else {
        that.healthBar.setFrame(0)
      }
    }
    healthCheck(this)
    dialogueCheck(this)
  }
}
