import { Level } from "./level"
import { Hud } from "./hud"
import { Dead } from "./death"
import { Boot } from "./boot"
import { Before } from "./before"
import titleImage from './assets/images/title.png'
import startImage from './assets/images/start.png'
import f1 from './assets/images/f1.png'
import f2 from './assets/images/f2.png'
import s1 from './assets/images/s1.png'
import s2 from './assets/images/s2.png'
import o1 from './assets/images/o1.png'
import overlay from './assets/images/overlay.png'
import healthBar from './assets/images/health.png'
import textBox from './assets/images/text.png'
import no from './assets/images/xmark.png'
import yes from './assets/images/checkmark.png'
import next from './assets/images/next.png'
import black from './assets/images/black.png'
import egg from './assets/images/egg.png'
import map from './assets/maps/sperm.json'
import tiles from './assets/images/tiles.png'
import sperm from './assets/images/sperm.png'
import antibody from './assets/images/white_blood_cell.png'
import xmark from './assets/images/xmark.png'
import checkmark from './assets/images/checkmark.png'
import s3 from './assets/images/ejaculate.png'
export class Load extends Phaser.Scene {
    constructor() {
        super({ key: 'load' })
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
    this.load.spritesheet('sperm', sperm, { frameWidth: 7, frameHeight: 25 });
    this.load.spritesheet('antibody', antibody, { frameWidth: 40, frameHeight: 40 });
    this.load.image('egg', egg);
    this.load.tilemapTiledJSON('map', map);
    this.load.image('tiles', tiles);
    this.load.spritesheet('s1', s1, { frameWidth: 150, frameHeight: 177 })
    this.load.spritesheet('s2', s2, { frameWidth: 150, frameHeight: 177 })
    this.load.spritesheet('f1', f1, { frameWidth: 200, frameHeight: 200 })
    this.load.spritesheet('f2', f2, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('o1', o1, { frameWidth: 1200, frameHeight: 1200 })
    this.load.spritesheet('s3', s3, { frameWidth: 32, frameHeight: 32 })

    this.load.image('title', titleImage)
    this.load.spritesheet('start', startImage, { frameWidth: 69, frameHeight: 19 })
    
    this.load.image('black', black)

    this.load.image('overlay', overlay)
    this.load.spritesheet('health', healthBar, { frameWidth: 53, frameHeight: 9 })
    this.load.image('next', next)

    this.load.image('yes', yes)
    this.load.image('no', no)
    this.load.image('box', textBox)
    
}
    create() {
        this.add.text(100, 100, 'Loading Assets')
        this.scene.add('before', Before)
        this.scene.add('level', Level)
        this.scene.add('hud', Hud)
        this.scene.add('dead', Dead)
        this.scene.add('boot', Boot)
        this.scene.start('boot')

    }
}
