import _ from "lodash";
import { Scene } from "phaser";

export class BackgroundScene extends Scene {
    constructor() {
        super({ key: 'Background' })

        this.backgroundData = [
            {name: "background-1", path: "assets/levels/prototype/background/Background1.png", end: 100},
            {name: "background-2", path: "assets/levels/prototype/background/Background2.png", end: 300},
            {name: "background-3", path: "assets/levels/prototype/background/Background3Back.png", end: -1}
        ]

        this.currentBackground = 0
    }

    preload() {
        _.each(this.backgroundData, ({name, path}) => {
            this.load.image(name, path);
        })
    }

    create() {
        this.createBackgroundImage()
        
        this.registry.events.on('changedata', this.updateScale, this)
    }

    clickBackground(pointer) {
        if (pointer.leftButtonDown())
            this.scene.get('Counters').increaseCount()
    }

    createBackgroundImage() {
        let { width, height } = this.game.canvas
        let {name, end} = this.backgroundData[this.currentBackground]

        this.background = this.add.image(width/2, height/2, name).setInteractive();
        this.background.on('pointerdown', (pointer) => this.clickBackground(pointer))

        this.endSize = end
    }

    updateScale(parent, key, data) {
        if (key !== 'size')
            return

        if (data >= this.endSize && this.endSize > 0) {
            this.background.destroy()
            this.currentBackground += 1

            this.createBackgroundImage()
            this.scene.get('Foreground').updateForeground(this.currentBackground)
        }
    }
}