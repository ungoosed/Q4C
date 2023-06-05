import Phaser from 'phaser';
import { Load } from './load';


const config = {
  backgroundColor: 0x710c04,
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      debug: true
    }
  },
  pixelArt: true,
  render: {
    antialias: true,
    pixelArt: true,
    roundPixels: true
  },
  scene: [new Load],
}

const game = new Phaser.Game(config);
const global = { speed: 2000, health: 100 }


