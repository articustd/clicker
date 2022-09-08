import { logger } from "@util/Logging"
import { Scene } from "phaser"

export class CharacterScene extends Scene {
    defaultScale
    currentScale

    constructor() {
        super({ key: 'Character' })

        this.characterData = [
            { name: "character-1", path: "assets/levels/prototype/character/Model-1.png", end: 100, endingScale: 1 },
            { name: "character-2", path: "assets/levels/prototype/character/Model-2.png", end: 300 , endingScale: 0.6, originY: 0.95, y: 1200},
            { name: "character-3", path: "assets/levels/prototype/character/Model-3.png", end: -1, scaleIncrement: 0.002, originY: 0.95, y: 1200 }
        ]

        this.defaultScale = 0.35
        this.defaultModifier = 0.01
        this.currentScale = this.defaultScale
        this.currentCharacter = 0
        this.endSize = 0
    }

    preload() {
        _.each(this.characterData, ({ name, path }) => {
            this.load.image(name, path);
        })
    }

    create() {
        this.scaleModifier = this.defaultModifier
        this.createCharacterImage()

        this.registry.events.on('changedata', this.updateScale, this)
    }

    updateScale(parent, key, data) {
        if (key !== 'size')
            return

        this.currentScale += this.scaleModifier
        this.character.setScale(this.currentScale)

        if (data >= this.endSize && this.endSize > 0) {
            this.character.destroy()
            this.currentCharacter += 1

            this.createCharacterImage()
        }
    }

    createCharacterImage() {
        let { width, height } = this.game.canvas
        let { name, end, originY, y, startingScale, endingScale, scaleIncrement } = this.characterData[this.currentCharacter]

        this.scaleModifier = this.defaultModifier

        if(!originY)
            originY = 0.9
        if(!y)
            y = height - (height / 6)
        if (!startingScale)
            startingScale = this.defaultScale
        if (!endingScale)
            endingScale = 1

        if (scaleIncrement)
            this.scaleModifier = scaleIncrement
        if(!scaleIncrement && end > 0)
            this.scaleModifier = _.round((endingScale-startingScale)/(end - this.endSize), 3)

        this.character = this.add.image(width / 2, y, name);
        this.character.setOrigin(0.5, originY)
        this.character.setScale(startingScale)

        this.currentScale = startingScale
        this.endSize = end
    }
}