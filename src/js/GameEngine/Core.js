import { logger } from '@util/Logging';
import { Game } from 'phaser'
import { ClickGame, DemoScene } from './scenes';

let config = {
    type: Phaser.AUTO,
    backgroundColor: '#4488aa',
    width: 720,
    height: 1280,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "phaser-root"
    },
    scene: [ClickGame]
};

export let game = new Game(config);