
import xmark from './assets/images/xmark.png'
import checkmark from './assets/images/checkmark.png'
export class Before extends Phaser.Scene {
  constructor() {
    super({ key: 'before' })
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
      loadFont('Mainport', './src/assets/fonts/Mainport.ttf')
      this.load.image('no', xmark)
      this.load.image('yes', checkmark)


  }
  
  create() {
    this.no = this.add.image(this.cameras.main.centerX - 128, this.cameras.main.centerY + 200, 'no').setScale(3).setInteractive(this.input.makePixelPerfect())
    this.yes = this.add.image(this.cameras.main.centerX + 64, this.cameras.main.centerY + 200, 'yes').setScale(3).setInteractive(this.input.makePixelPerfect())

    this.text = this.add.text(this.cameras.main.centerX, 0, 'Welcome to the world of human reproduction! \n \nYour mission is to navigate the tiny Sperm on its journey through the female reproductive system in a quest to fertilize the egg! Be aware though, this isn’t an easy mission, you’ll encounter many obstacles and challenges along the way. In this game, only the fastest, most skilled sperm will win! \n \nAre you ready to explore and conquer the world of human reproduction?', { 
        fontSize: 24,
        fontFamily: 'Mainport',
        align: "center",
        wordWrap: { width: 450}
    }).setOrigin(0.5, -0.1)
    const that = this
    that.no.on('pointerup', function (event) {
        that.scene.stop('before')
        that.scene.start('boot')

      });
    that.yes.on('pointerup', function (event) {
      that.scene.stop('boot')
      that.scene.start('hud')
      that.scene.start('level')
      that.scene.bringToTop('thatd')
    });

  }
}
