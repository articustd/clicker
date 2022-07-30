import { logger } from "@util/Logging";
import { Geom, Scene } from "phaser";
import { DemoScene } from "./DemoScene";

export class ClickMenus extends Scene {
    constructor() {
        super({ key: 'ClickMenus' })
    }

    preload() {
    }

    create() {
        let { width, height } = this.game.canvas
        let sizeUpgrades = this.add.graphics();
        let currencyUpgrades = this.add.graphics();

        sizeUpgrades.fillStyle(0x00ff00)
        sizeUpgrades.fillRect(0, 500, 100, 100)
        sizeUpgrades.setInteractive({ hitArea: new Geom.Rectangle(0, 500, 100, 100), hitAreaCallback: Geom.Rectangle.Contains, cursor: 'pointer' })
        let sizeText = this.add.text(10, 535, 'Size\nUpgrades', { color: '#000000', align: 'center' });
        sizeUpgrades.on('pointerdown', () => {
            logger('Clicked Size Upgrades')
        })

        currencyUpgrades.fillStyle(0x00ff00)
        currencyUpgrades.fillRect(width-100, 500, 100, 100)
        currencyUpgrades.setInteractive({ hitArea: new Geom.Rectangle(width-100, 500, 100, 100), hitAreaCallback: Geom.Rectangle.Contains, cursor: 'pointer' })
        let currencyText = this.add.text(width-85, 535, 'Currency\nUpgrades', { color: '#000000', align: 'center' });
        currencyUpgrades.on('pointerdown', () => {
            logger('Clicked Currency Upgrades')
        })
    }

    update() {
    }
}