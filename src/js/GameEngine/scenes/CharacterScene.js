import { logger } from "@util/Logging"
import { Scene } from "phaser"

export class CharacterScene extends Scene {
    defaultScale
    currentScale

    constructor() {
        super({ key: 'Character' })

        this.characterData = [
            { name: "character-1", path: "assets/levels/prototype/character/Model-1.png", end: 50 },
            { name: "character-2", path: "assets/levels/prototype/character/Model-2.png", end: 100 },
            { name: "character-3", path: "assets/levels/prototype/character/Model-3.png", end: 150 }
        ]

        this.defaultScale = 0.35
        this.currentScale = this.defaultScale
        this.currentCharacter = 0
    }

    preload() {
        _.each(this.characterData, ({ name, path }) => {
            this.load.image(name, path);
        })
    }

    create() {
        let { width, height } = this.game.canvas
        let {name, end} = this.characterData[this.currentCharacter]
        this.character = this.add.image(width / 2, height - (height / 6), name);
        this.character.setOrigin(0.5, 0.9)
        this.character.setScale(this.defaultScale)
        this.endSize = end

        this.registry.events.on('changedata', this.updateScale, this)
    }

    updateScale(parent, key, data) {
        if (key !== 'size')
            return

        this.currentScale += 0.01
        this.character.setScale(this.currentScale)

        if (data >= this.endSize) {
            this.character.destroy()
            let { width, height } = this.game.canvas
            this.currentCharacter += 1
            let {name, end} = this.characterData[this.currentCharacter]
            this.character = this.add.image(width / 2, height - (height / 6), name);
            this.character.setOrigin(0.5, 0.9)
            this.character.setScale(this.defaultScale)
            this.currentScale = this.defaultScale
            this.endSize = end
        }
    }
}