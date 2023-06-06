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
      if (dlevel == 0) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('The testes are the starting point of the Sperm\'s adventure. They are encased inside the scrotum to help protect it. The testes are responsible for prducing Sperm and testosterone. If we take closer look into the testes we can see the seminiferous tubules at work producing sperm.')
      }
      if (dlevel == 1) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('With the help of Testosterone, the Sperm gains the endurance and strength to overcome the obstacles in its journey! After the Sperm is produced they make their way to the epididymis where they develop and mature, waiting until their time has come to begin their epic journey.')
      }
      if (dlevel == 2) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('It’s that time of the month again, ovulation is happening right now. Ovulation marks the moment when a follicle, located inside the ovaries, grows an immature egg. When the egg has fully developed and mature the follicle will release the egg.')
      }
      if (dlevel == 3) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        var side = that.registry.get('tube')
        if (side == 0) {
          side = 'left'
        } else {
          side = 'right'
        }
        that.dialogueText.setText('The mature egg will make its way outside the ovary and into the fallopian tube where it will patiently wait for the sperm to find it and fertilize it. Remember only one ovary will release an egg every month. This month, the ovary releases on the ' + side + ' side.')
      }
      if (dlevel == 4) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('Now that their time is here, the sperm make their way through the vas deferens which guides them through a long path towards their destination. Along the vas deferens, the sperm mixes with seminal fluids from the prostate and seminal vesicle.')
      }
      if (dlevel == 5) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('When these seminal fluids mix together with sperm it creates semen. The sperm is now swimming through the urethra, the final gateway leading out the penis and into the vagina. ')
      }
      if (dlevel == 6) {
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('Remember, once you’re out there, its time for you to lead the way. Be the first to reach the egg and fertilize it! Don’t let us down, Buddy. We’re counting on you to bring new life into this world!')

      }
      if (dlevel == 7) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('You are now located in the vagina. The tiny thing you are controlling is called the sperm. Guide the sperm through the intricate twists and turns of the female reproductive system. You’re task right now is to travel up the vagina and into a small opening in the cervix. Be careful though, the female reproductive system is a dangerous place for you tiny sperm.')
      }
      if (dlevel == 9) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('Welcome to the cervix. Continue down this narrow path and winding maze to make your way to the uterus. Here you will encounter dangerous white antibodies which will hunt you down mercilessly.')
        
      }
      if (dlevel == 11) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('This large opening leads to the Uterus. Inside the Uterus, it is like a vast area for the sperm. It is your job now to navigate around the Uterus and find a tiny opening in the walls that leads to one of the two fallopian tubes. Good luck, mighty swimmer.')
        
      }
      if (dlevel == 13) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('Congrats! You have discovered one of the entrances to the fallopian tubes.  Swim through the fallopian tube to find the egg. \nHint: If you don\'t see an egg, you might me in the wrong tube. Try looking for the entrance to the other one')
        
      }
      if (dlevel == 15) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('Congrats! You have been successful in being the first to reach the egg and fertilizing it. Your job is now done. Your hard journey is coming to an end. The genetic material in the sperm merges with the egg and initiates the process of fertilization. ')
        
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
    function dialoguePosition(that) {
      const playerY = that.registry.get('playerY');

      if (playerY >= 12400) {
        that.level = 0;
        that.levelText.setText('Level: Vagina')

      } else if (playerY >= 7474) {
        that.level = 1;
        that.levelText.setText('Level: Cervix')
        if (that.dialogueLevel == 8) {
          that.dialogueLevel = 9;
        }
      } else if (playerY >= 905) {
        that.level = 2;
        that.levelText.setText('Level: Uterus')


        if (that.dialogueLevel == 10) {
          that.dialogueLevel = 11;
        }
      } else {
        that.level = 3;
        that.levelText.setText('Level: Fallopian Tube')

        if (that.dialogueLevel == 12) {
          that.dialogueLevel = 13;

        }
      }
    }
    dialoguePosition(this)
    healthCheck(this)
    dialogueCheck(this)
  }
}
