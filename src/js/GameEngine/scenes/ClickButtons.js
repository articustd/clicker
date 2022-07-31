import { logger } from "@util/Logging";
import { Display, Geom, Scene } from "phaser";

export class ClickButtons extends Scene {
    constructor() {
        super({ key: 'ClickButtons' })
    }

    preload() {
    }

    create() {
        let { width, height } = this.game.canvas
        let sizeUpgrades = this.add.rectangle(50, 550, 100, 100, 0x00ff00).setInteractive({cursor: 'pointer'});
        let currencyUpgrades = this.add.rectangle(width-50, 550, 100, 100, 0x00ff00).setInteractive({cursor: 'pointer'});

        let sizeText = this.add.text(0, 0, 'Size\nUpgrades', { color: '#000000', align: 'center' });
        Display.Align.In.Center(sizeText, sizeUpgrades)
        sizeUpgrades.on('pointerdown', () => {
            logger('Clicked Size Upgrades')
            this.scene.run('ClickMenus', {title: "Size Upgrades"})
        })

        let currencyText = this.add.text(0, 0, 'Currency\nUpgrades', { color: '#000000', align: 'center' });
        Display.Align.In.Center(currencyText, currencyUpgrades)
        currencyUpgrades.on('pointerdown', () => {
            logger('Clicked Currency Upgrades')
            this.scene.run('ClickMenus', {title: "Currency Upgrades"})
        })
    }

    update() {
    }
}