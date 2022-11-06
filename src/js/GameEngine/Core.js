import { logger } from '@util/Logging';
import { Game } from 'phaser'
import { ClickGame, DemoScene } from './scenes';
import { Theme } from './utils/Theme';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

let config = {
    type: Phaser.AUTO,
    backgroundColor: Theme.backgroundColor,
    width: 720,
    height: 1280,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "phaser-root"
    },
    scene: [ClickGame]
};

export let game = new Game(config);