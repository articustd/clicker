import { logger } from "@util/Logging";
import { Scene } from "phaser";

export class Counters extends Scene {
    CounterTexts
    Size
    Currency

    constructor() {
        super({ key: 'Counters' })
    }

    preload() {
    }

    create() {
        let { width, height } = this.game.canvas

        this.Size = 0
        this.Currency = 0
        
        this.CounterText = this.add.text((width/2)-40, 50, '', { fill: '#00ff00' });
        this.setCounterText()
    }

    update() {
    }

    countHandler() {
        this.Size++
        this.Currency++
        this.setCounterText()
    }

    setCounterText() {
        this.CounterText.setText([
            `Size: ${this.Size}`,
            `Currency: ${this.Currency}`
        ])
    }
}