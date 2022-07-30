import { logger } from '@util/Logging';
import { Game } from 'phaser'
import { ClickGame } from './scenes/ClickGame'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: ClickGame
};

export let game = new Game(config);