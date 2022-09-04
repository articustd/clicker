import { logger } from '@util/Logging';
import { Game } from 'phaser'
import { ClickGame, DemoScene } from './scenes';
import { Theme } from './utils/Theme';

let config = {
    type: Phaser.AUTO,
    backgroundColor: Theme.backgroundColor,
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