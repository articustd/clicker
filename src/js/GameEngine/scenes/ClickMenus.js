import { logger } from "@util/Logging";
import { Geom, Scene } from "phaser";
import { DemoScene } from "./DemoScene";

export class ClickMenus extends Scene {
    text1
    text2

    constructor() {
        super({ key: 'ClickMenus' })
    }

    preload() {
    }

    create() {
        let graphics = this.add.graphics();

        graphics.fillStyle(0x00ff00)
        graphics.fillRect(0, 500, 100, 100)
        graphics.setInteractive({hitArea: new Geom.Rectangle(0, 500, 100, 100), hitAreaCallback: Geom.Rectangle.Contains, cursor: 'pointer'})

        graphics.on('pointerdown', () => {
            console.log('Clicked Test Button')
        })

        this.text1 = this.add.text(30, 550, 'Test', { fill: '#000000' });
    }

    update() {
    }
}