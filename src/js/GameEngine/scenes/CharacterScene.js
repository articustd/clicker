import { Scene } from "phaser"

export class CharacterScene extends Scene {
    constructor() {
        super({ key: 'Character' })
    }

    preload() {
        // this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('character', 'assets/levels/prototype/character/Model-1.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        let { width, height } = this.game.canvas
        let character = this.add.image(width/2, height - (height/3), 'character');
        character.setScale(0.35)
    }
}