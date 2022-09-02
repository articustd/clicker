import { logger } from "@util/Logging"
import { Scene } from "phaser"

export class CharacterScene extends Scene {
    defaultScale
    currentScale

    constructor() {
        super({ key: 'Character' })

        this.defaultScale = 0.35
        this.currentScale = this.defaultScale
    }

    preload() {
        // this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('character', 'assets/levels/prototype/character/Model-1.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        let { width, height } = this.game.canvas
        this.character = this.add.image(width/2, height - (height/6), 'character');
        this.character.setOrigin(0.5, 1)
        this.character.setScale(this.defaultScale)
        
        this.registry.events.on('changedata', this.updateScale, this)
    }

    updateScale(parent, key, data) {
        if(key === 'size') {
            // logger({parent, key, data})
            // logger(this.character)
            this.currentScale += 0.01
            this.character.setScale(this.currentScale)
        }
            
    }
}