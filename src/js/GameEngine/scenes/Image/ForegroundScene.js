import { logger } from "@util/Logging"
import { Scene } from "phaser"

export class ForegroundScene extends Scene {
    constructor() {
        super({ key: 'Foreground' })

        this.foregroundData = [
            {},
            {},
            { name: "foreground-3", path: "assets/levels/prototype/foreground/Background3Front.png" }
        ]

        this.currentForeground = 0
    }

    preload() {
        _.each(this.foregroundData, ({ name, path }) => {
            if (name)
                this.load.image(name, path);
        })
    }

    create() {
        this.createForegroundImage()
    }

    createForegroundImage() {
        let { width, height } = this.game.canvas
        let { name } = this.foregroundData[this.currentForeground]

        this.foreground = this.add.image(width / 2, height / 2, name);
    }

    updateForeground(foregroundKey) {
        this.foreground.destroy()
        this.currentForeground = foregroundKey

        this.createForegroundImage()
    }
}