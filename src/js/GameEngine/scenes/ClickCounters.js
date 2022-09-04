import { getPrimary, getPrimaryFont, getSecondary } from "@GameEngine/utils/Theme";
import { logger } from "@util/Logging";
import { Display, Scene } from "phaser";

export class Counters extends Scene {
    CounterTexts
    _Size
    _Currency
    currencyClickAmount
    currencyPassiveAmount
    currencyPassiveRunning
    currencyRate
    currencyTick
    currencyText
    sizeClickAmount
    sizePassiveAmount
    sizePassiveRunning
    sizeRate
    sizeTick
    sizeText

    constructor() {
        super({ key: 'Counters' })
    }

    preload() {
    }

    create() {
        let { width, height } = this.game.canvas

        this.Size = 0
        this.Currency = 0

        this.sizeClickAmount = 1
        this.currencyClickAmount = 1

        this.sizePassiveAmount = 1
        this.currencyPassiveAmount = 1

        this.sizePassiveRunning = false
        this.currencyPassiveRunning = false

        this.sizeRate = 60
        this.currencyRate = 60

        this.sizeTick = 0
        this.currencyTick = 0

        this.add.rectangle(width / 2, 45, width, 10, getSecondary(), 0.8)
        this.add.rectangle(width / 2, 155, width, 10, getSecondary(), 0.8)
        let container = this.add.rectangle(width / 2, 100, width, 100, getPrimary(), 0.9)

        let leftContainer = this.add.rectangle(0, 0, width / 2, 200, 0xFF0000, 0)
        Display.Align.In.LeftCenter(leftContainer, container)
        let rightContainer = this.add.rectangle(0, 0, width / 2, 200, 0x0000FF, 0)
        Display.Align.In.RightCenter(rightContainer, container)
        this.sizeText = this.add.text(0, 0, '', { fill: getPrimaryFont(true), align: 'center' }).setOrigin(0.5);
        Display.Align.In.Center(this.sizeText, leftContainer)
        this.currencyText = this.add.text(0, 0, '', { fill: getPrimaryFont(true), align: 'center' }).setOrigin(0.5);
        Display.Align.In.Center(this.currencyText, rightContainer)

        this.setSizeText()
        this.setCurrencyText()
    }

    update() {
        if (this.sizePassiveRunning) {
            this.sizeTick += 1

            if (this.sizeTick >= this.sizeRate) {
                this.Size += this.sizePassiveAmount
                this.setCounterText()
                this.sizeTick -= this.sizeRate
            }

        }

        if (this.currencyPassiveRunning) {
            this.currencyTick += 1

            if (this.currencyTick >= this.currencyRate) {
                this.Currency += this.currencyPassiveAmount
                this.setCounterText()
                this.currencyTick -= this.currencyRate
            }
        }
    }

    get Currency() { return this._Currency }
    set Currency(Currency) { this._Currency = Currency; this.registry.set('currency', this._Currency) }

    get Size() { return this._Size }
    set Size(Size) { this._Size = Size; this.registry.set(`size`, this._Size) }

    increaseCount() {
        this.Size += this.sizeClickAmount
        this.Currency += this.currencyClickAmount
        this.setCounterText()
    }

    decreaseCount() {
        this.Size -= this.sizeClickAmount
        this.Currency -= this.currencyClickAmount
        this.setCounterText()
    }

    decreaseCurrency(amount) {
        this.Currency -= amount
        this.setCurrencyText()
    }

    setCounterText() {
        this.setSizeText()
        this.setCurrencyText()
    }

    setSizeText() {
        this.sizeText.setText([
            `Size: ${this.Size}`,
            `Size/s: ${this.getSizePassivePerSec()}`
        ])
    }

    getSizePassivePerSec() {
        if (!this.sizePassiveRunning)
            return 0

        return this.sizePassiveAmount / (this.sizeRate / 60)
    }

    setCurrencyText() {
        this.currencyText.setText([
            `Currency: ${this.Currency}`,
            `Currency/s: ${this.getCurrencyPassivePerSec()}`
        ])
    }

    getCurrencyPassivePerSec() {
        if (!this.currencyPassiveRunning)
            return 0

        return this.currencyPassiveAmount / (this.currencyRate / 60)
    }

    startPassive(type) {
        if (type === 'currency')
            this.currencyPassiveRunning = true
        else
            this.sizePassiveRunning = true

        this.setCounterText()
    }
}