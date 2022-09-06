import { Theme, getPrimary, getSecondary, getPrimaryFont } from "@GameEngine/utils/Theme";
import { logger } from "@util/Logging";
import { Display, Geom, Scene } from "phaser";

export class ClickButtons extends Scene {
    constructor() {
        super({ key: 'ClickButtons' })
    }

    preload() {
    }

    create() {
        let buttonDim = 150
        let { width, height } = this.game.canvas
        let sizeUpgradesButton = new ButtonBorder(this, {
            x: buttonDim / 2,
            y: height - (buttonDim / 2),
            dimension: buttonDim,
            outerExtra: 15,
            callback: () => { this.toggleOpen('SizeUpgradeMenu') }
        })
        
        let currencyUpgradesButton = new ButtonBorder(this, {
            x: width - (buttonDim / 2),
            y: height - (buttonDim / 2),
            dimension: buttonDim,
            outerExtra: 15,
            callback: () => { this.toggleOpen('CurrencyUpgradeMenu') }
        })

        let sizeText = this.add.text(0, 0, 'Size\nUpgrades', { color: getPrimaryFont(true), align: 'center' });
        Display.Align.In.Center(sizeText, sizeUpgradesButton.innerRect)

        let currencyText = this.add.text(0, 0, 'Currency\nUpgrades', { color: getPrimaryFont(true), align: 'center' });
        Display.Align.In.Center(currencyText, currencyUpgradesButton.innerRect)

        
    }

    update() {
    }

    toggleOpen(menuName) {
        if(this.scene.isSleeping(menuName))
            this.scene.run(menuName)
        else
            this.scene.sleep(menuName)
    }
}

class ButtonBorder {
    /**
     * @param {Phaser.Scene} scene 
     * @param {JSON} data 
     */
    constructor(scene, data) {
        this.scene = scene

        this.x = 0
        this.y = 0
        this._innerFillColor = getPrimary()
        this._innerAlpha = 1

        this._outerFillColor = getSecondary()
        this._outerAlpha = 1
        this._outerExtra = 0
        this.outerRounded = 0
        this.innerRounded = 0

        _.each(data, (value, key) => {
            this[key] = value
        })

        this.outerRect = scene.add.rectangle(this._x, this._y, this._width + this._outerExtra, this._height + this._outerExtra, this._outerFillColor, this._outerAlpha)
        this._innerRect = scene.add.rectangle(this._x, this._y, this._width, this._height, this._innerFillColor, this._innerAlpha)

        if (this.callback) {
            this._innerRect.setInteractive({ cursor: 'pointer' })
            this._innerRect.on('pointerdown', this.callback)
        }
    }

    set dimension(dimension) { this.width = dimension; this.height = dimension }

    set outerExtra(outerExtra) { this._outerExtra = outerExtra }

    set height(height) { this._height = height }
    set width(width) { this._width = width }

    set x(x) { this._x = x }
    set y(y) { this._y = y }

    get innerRect() { return this._innerRect }
}

