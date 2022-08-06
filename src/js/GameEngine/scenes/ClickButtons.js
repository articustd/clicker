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
        let sizeUpgradesButton = this.add.rectangle(50, 550, 100, 100, 0x00ff00).setInteractive({ cursor: 'pointer' });
        let currencyUpgradesButton = this.add.rectangle(width - 50, 550, 100, 100, 0x00ff00).setInteractive({ cursor: 'pointer' });

        let sizeText = this.add.text(0, 0, 'Size\nUpgrades', { color: '#000000', align: 'center' });
        Display.Align.In.Center(sizeText, sizeUpgradesButton)
        sizeUpgradesButton.on('pointerdown', () => {
            logger('Clicked Size Upgrades')
            this.scene.run('SizeUpgradeMenu')
        })

        let currencyText = this.add.text(0, 0, 'Currency\nUpgrades', { color: '#000000', align: 'center' });
        Display.Align.In.Center(currencyText, currencyUpgradesButton)
        currencyUpgradesButton.on('pointerdown', () => {
            logger('Clicked Currency Upgrades')
            this.scene.run('CurrencyUpgradeMenu')
        })

        this.registry.set('sizeUpgrades', sizeUpgrades)
        this.registry.set('currencyUpgrades', currencyUpgrades)
    }

    update() {
    }
}

let sizeUpgrades = [{ title: 'Passive Size Start', desc: 'Starts the passive gain on Size', cost: 1, purchased: false, stat: 'size' }]
let currencyUpgrades = [{ title: 'Passive Currency Start', desc: 'Starts the passive gain on Currency', cost: 1, purchased: false, stat: 'currency' }]