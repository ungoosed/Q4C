export class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud' })
  }

  create() {
    this.black = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'black').setVisible(false).setDepth(0).setScale(10)
    this.f1 = this.add.sprite(400, 200, 'f1').setVisible(false).setDepth(1)
    this.f2 = this.add.sprite(400, 200, 'f2').setVisible(false).setDepth(1)
    this.s1 = this.add.sprite(400, 200, 's1').setVisible(false).setDepth(1).setScale(2.2)
    this.s2 = this.add.sprite(400, 200, 's2').setVisible(false).setDepth(1).setScale(2.2)
    this.o1 = this.add.sprite(400, 200, 'o1').setVisible(false).setDepth(1).setScale(0.4)
    this.s3 = this.add.sprite(400, 200, 's3').setVisible(false).setDepth(1).setScale(0.4)

    this.s3.anims.create({
      key: 's3anim',
      frames: this.anims.generateFrameNumbers('s3', { start: 0, end: 8 }),
      frameRate: 20,
      repeat: -1
    })
    this.f1.anims.create({
      key: 'f1anim',
      frames: this.anims.generateFrameNumbers('f1', { start: 0, end: 41 }),
      frameRate: 15,
      repeat: -1
    })
    this.f2.anims.create({
      key: 'f2anim',
      frames: this.anims.generateFrameNumbers('f2', { start: 0, end: 33 }),
      frameRate: 5,
      repeat: -1
    })
    this.s1.anims.create({
      key: 's1anim',
      frames: this.anims.generateFrameNumbers('s1', { start: 0, end: 5 }),
      frameRate: 1,
      repeat: -1
    })
    this.s2.anims.create({
      key: 's2anim',
      frames: this.anims.generateFrameNumbers('s2', { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1
    })
    this.o1.anims.create({
      key: 'o1anim',
      frames: this.anims.generateFrameNumbers('o1', { start: 0, end: 24 }),
      frameRate: 4,
      repeat: -1
    })




    this.healthBar = this.add.sprite(150, 50, 'health', 5,).setScale(4)
    this.overlay = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'overlay').setScale(4).setDepth(-5)
    this.overlay.setScrollFactor(0, 0)
    this.healthBar.setScrollFactor(0, 0).setDepth(-1)
    this.eggPos;
    if (this.registry.get('tube') == 0) {
      this.eggPos = [3018, 512]
    } else {
      this.eggPos = [13157, 610]
    }
    this.levelText = this.add.text(400, 30, 'Level: Vagina', { fontFamily: 'Mainport' }).setFontSize(20).setDepth(-1)

    this.level = 0;

    this.registry.set('dlevel', this.dialogueLevel)

    this.dialogue = this.add.group()

    this.box = this.add.image(this.cameras.main.centerX, 590, 'box').setScale(6.2).setOrigin(0.5, 0.5).setDepth(2)
    this.yes = this.add.image(this.cameras.main.width - 50, 540, 'yes').setScale(2).setDepth(3).setInteractive()
    this.next = this.add.image(this.cameras.main.width - 50, 540, 'next').setScale(2).setDepth(3).setInteractive()
    this.dialogueText = this.add.text(30, 420, 'if you see this you are bad and should tell kamikid right away', {
      lineSpacing: 5,
      fontSize: 24,
      fontFamily: 'Mainport',
      align: "left",
      wordWrap: { width: 690 }

    }).setFontSize(20).setDepth(3)
    this.dialogueLevel = 0;
    this.registry.set('finish, false')
    this.dialogue.add(this.dialogueText)
    this.dialogue.add(this.yes)
    this.dialogue.add(this.next)
    this.dialogue.add(this.box)


    this.dialogue.setVisible(false)

    this.next.on('pointerup', () => {
      this.dialogueLevel = this.dialogueLevel + 1
    })
    this.yes.on('pointerup', () => {
      if (this.dialogueLevel == 6) {
        this.s3.anims.play('s3anims', true)
        this.cameras.main.fadeOut(1000, 0, 0, 0) 
          setTimeout(() => {
            this.dialogueLevel = 7
            this.dialogue.setVisible(false)
            this.scene.resume('level')
            this.black.setVisible(false)
            this.s1.setVisible(false)
            this.s2.setVisible(false)
            this.s3.setVisible(false)
            this.f1.setVisible(false)
            this.f2.setVisible(false)
            this.o1.setVisible(false)
            this.cameras.main.fadeIn(1000, 0, 0, 0)

          }, 1000);
        
      }
      else {
        this.dialogueLevel = this.dialogueLevel + 1
        this.dialogue.setVisible(false)
        this.scene.resume('level')
        this.black.setVisible(false)
        this.s1.setVisible(false)
        this.s2.setVisible(false)
        this.f1.setVisible(false)
        this.f2.setVisible(false)
        this.o1.setVisible(false)
      }
    }
    )

  }

  update() {
    this.registry.set('dlevel', this.dialogueLevel)
    function dialogueCheck(that) {
      const dlevel = that.registry.get('dlevel')
      console.log(dlevel)
      if (dlevel == 0) {
        that.scene.pause('level')
        that.black.setVisible(true)
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.s1.setVisible(true)
        that.s1.anims.play('s1anim', true)

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
        that.s1.setVisible(false)
        that.o1.setVisible(true)
        that.o1.anims.play('o1anim', true)
        that.black.setVisible(true)
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
        that.o1.setVisible(false)
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.s2.setVisible(true)
        that.s2.anims.play('s2anim', true)
        that.dialogueText.setText('Now that their time is here, the sperm make their way through the vas deferens which guides them through a long path towards their destination. Along the vas deferens, the sperm mixes with seminal fluids from the prostate and seminal vesicle.')
      }
      if (dlevel == 5) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('When these seminal fluids mix together with sperm it creates semen. The sperm is now swimming through the urethra, the final gateway leading out the penis and into the vagina. ')
      }
      if (dlevel == 6) {
        that.s2.setVisible(false)
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
        that.scene.stop('level')
        that.registry.set('finish', false)
        that.cameras.main.fadeOut(1000, 0, 0, 0)
        setTimeout(() => {
          that.cameras.main.fadeIn(1000, 0, 0, 0)
          that.black.setVisible(true)
          that.dialogue.setVisible(true);
          that.yes.setVisible(false)
          that.f1.setVisible(true)
          that.f1.play('f1anim', true)
          that.dialogueText.setText('Congrats! You have succeeded in being the first to reach the egg and fertilizing it. Your job is now done. Your hard journey is coming to an end. The genetic material in the sperm merges with the egg and initiates the process of fertilization. ')

        }, 1100)

      }
      if (dlevel == 16) {
        that.scene.pause('level')
        that.dialogue.setVisible(true);
        that.f1.setVisible(false)
        that.yes.setVisible(false)
        that.f2.setVisible(true)
        that.f2.anims.play('f2anim', true)
        that.dialogueText.setText('The first trimester has begun. The fertilized egg is now a zygote. The zygote makes its way through the fallopian tube and back out into the uterus. Once inside the uterus again the zygote will implant itself into the uterus walls, also known as the endometrium. The zygote is now considered an embryo. The embryo is encased in an amniotic sac which is filled with amniotic fluid. ')

      }
      if (dlevel == 17) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('The first trimester has begun. The fertilized egg is now a zygote. The zygote makes its way through the fallopian tube and back out into the uterus. Once inside the uterus again the zygote will implant itself into the uterus walls, also known as the endometrium. The zygote is now considered an embryo. The embryo is encased in an amniotic sac which is filled with amniotic fluid. ')

      }
      if (dlevel == 18) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('During early development, all cells in the embryo can become any cell type in the body. As the embryo develops, differentiation becomes crucial so that the cells in the embryo grow into specific organs.The embryo will begin to undergo rapid growth and development. Stem cells help form and develop the organs during the embryo’s development.')

      }
      if (dlevel == 19) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('Now, the embryo is considered a fetus and the second trimester has begun. During the second trimester, the organs and body continue to develop and the fetus gains weight. The fetus\'s senses, like hearing and taste, begin to develop. ')

      }
      if (dlevel == 20) {
        that.dialogue.setVisible(true);
        that.yes.setVisible(false)
        that.dialogueText.setText('The third trimester has begun. The fetus will experience rapid growth once again. It will gain even more weight and begin to settle in a head down position to prepare for birth.')

      }
      if (dlevel == 21) {
        that.dialogue.setVisible(true);
        that.next.setVisible(false)
        that.dialogueText.setText('Once the time is right, around 40 weeks after fertilization, birth will take place. The uterus will contract to help push out the fetus. Most often the baby’s head is the first to emerge then followed by the body. As the final moments draw near, a new life is born, ending off the journey through the reproduction system.')

        if (dlevel == 22) {
          that.cameras.main.fadeOut(1000, 0, 0, 0)
          that.black.setVisible(true)
          that.dialogue.setVisible(false);
          that.next.setVisible(false)
          that.cameras.main.fadeIn(1000, 0, 0, 0)
          that.add.text(50, 50, 'Congratulations to all the players who embarked on this epic journey. You have successfully completed The Quest of Conception. \n Thanks for playing this game! If you have any Ideas, questions, or Issues that you find with the game, please contact asherc@myvcs.ca or jaydenl3@myvcs.ca')

        }


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
      if (that.registry.get('finish') == true) {
        that.dialogueLevel = 15
      }
      if (playerY >= 12400) {
        that.level = 0;
        that.levelText.setText('Level: Vagina')

      } else if (playerY >= 7474) {
        that.level = 1;
        that.levelText.setText('Level: Cervix')
        if (that.dialogueLevel == 8) {
          that.dialogueLevel = 9;
        }
      } else if (playerY >= 1500) {
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
