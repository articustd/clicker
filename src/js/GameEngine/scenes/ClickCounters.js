import { logger } from "@util/Logging";
import { Scene } from "phaser";

export class Counters extends Scene {
    CounterTexts
    _Size
    _Currency

    constructor() {
        super({ key: 'Counters' })
    }

    preload() {
    }

    create() {
        let { width, height } = this.game.canvas

        this.Size = 0
        this.Currency = 0

        this.CounterText = this.add.text((width / 2) - 40, 50, '', { fill: '#00ff00' });
        this.setCounterText()


    }

    update() {
    }

    get Currency() { return this._Currency }
    set Currency(Currency) { this._Currency = Currency; this.registry.set('currency', this._Currency) }

    get Size() { return this._Size }
    set Size(Size) { this._Size = Size; this.registry.set(`size`, this._Size) }

    increaseCount() {
        this.Size += 1
        this.Currency += 1
        this.setCounterText()
    }

    decreaseCount() {
        this.Size -= 1
        this.Currency -= 1
        this.setCounterText()
    }

    decreaseCurrency(amount) {
        this.Currency -= amount
        this.setCounterText()
    }

    setCounterText() {
        this.CounterText.setText([
            `Size: ${this._Size}`,
            `Currency: ${this.Currency}`
        ])
    }
}