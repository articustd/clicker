import { getPrimary, getPrimaryFont, getSecondary } from "@GameEngine/utils/Theme";
import { logger } from "@util/Logging";
import _ from "lodash";
import { Display, Scene } from "phaser";

export class Counters extends Scene {
    CounterTexts
    _Size
    _Currency

    _currencyModifiers
    _sizeModifiers

    currencyClickAmount
    currencyIdleAmount
    currencyIdleRunning
    currencyRate
    currencyTick
    currencyText
    currencyIdleBonus
    currencyClickBonus

    sizeClickAmount
    sizeIdleAmount
    sizeIdleRunning
    sizeRate
    sizeTick
    sizeText
    sizeIdleBonus
    sizeClickBonus

    constructor() {
        super({ key: 'Counters' })
    }

    preload() {
    }

    create() {
        let { width, height } = this.game.canvas

        this._sizeModifiers = []
        this._currencyModifiers = []

        this.Size = 0
        this.Currency = 0

        this.sizeClickAmount = 1
        this.currencyClickAmount = 1

        this.sizeClickBonus = 1
        this.currencyClickBonus = 1

        this.sizeIdleAmount = 1
        this.currencyIdleAmount = 1

        this.sizeIdleBonus = 1
        this.currencyIdleBonus = 1

        this.sizeIdleRunning = false
        this.currencyIdleRunning = false

        this.sizeRate = 60
        this.currencyRate = 60

        this.sizeTick = 0
        this.currencyTick = 0

        this.add.rectangle(width / 2, 60, width, 10, getSecondary(), 0.8)
        this.add.rectangle(width / 2, 170, width, 10, getSecondary(), 0.8)
        let container = this.add.rectangle(width / 2, 115, width, 100, getPrimary(), 0.9)

        let leftContainer = this.add.rectangle(0, 0, width / 2, 200, 0xFF0000, 0)
        Display.Align.In.LeftCenter(leftContainer, container)

        let rightContainer = this.add.rectangle(0, 0, width / 2, 200, 0x0000FF, 0)
        Display.Align.In.RightCenter(rightContainer, container)

        this.sizeText = this.add.text(0, 0, '', { fill: getPrimaryFont(true), align: 'center' }).setOrigin(0.5).setLineSpacing(10)
        Display.Align.In.Center(this.sizeText, leftContainer)
        
        this.currencyText = this.add.text(0, 0, '', { fill: getPrimaryFont(true), align: 'center' }).setOrigin(0.5).setLineSpacing(10)
        Display.Align.In.Center(this.currencyText, rightContainer)

        this.setSizeText()
        this.setCurrencyText()
    }

    update() {
        if (this.sizeIdleRunning) {
            this.sizeTick += 1

            if (this.sizeTick >= this.sizeRate) {
                this.Size += this.sizeIdleBonus
                this.setCounterText()
                this.sizeTick -= this.sizeRate
            }

        }

        if (this.currencyIdleRunning) {
            this.currencyTick += 1

            if (this.currencyTick >= this.currencyRate) {
                this.Currency += this.currencyIdleBonus
                this.setCounterText()
                this.currencyTick -= this.currencyRate
            }
        }
    }

    get Currency() { return this._Currency }
    set Currency(Currency) { this._Currency = Currency; this.registry.set('currency', this._Currency) }

    get currencyModifiers() {return this._currencyModifiers}
    set currencyModifiers(currencyModifiers) {
        this._currencyModifiers = currencyModifiers
        this.currencyClickBonus = this.getBonus(currencyModifiers, this.currencyClickAmount, 'click')
        this.currencyIdleBonus = this.getBonus(currencyModifiers, this.currencyIdleAmount, 'idle')
    }

    get Size() { return this._Size }
    set Size(Size) { this._Size = Size; this.registry.set(`size`, this._Size) }
    
    get sizeModifiers() {return this._sizeModifiers}
    set sizeModifiers(sizeModifiers) {
        this._sizeModifiers = sizeModifiers
        this.sizeClickBonus = this.getBonus(sizeModifiers, this.sizeClickAmount, 'click')
        this.sizeIdleBonus = this.getBonus(sizeModifiers, this.sizeIdleAmount, 'idle')
    }

    increaseCount() {
        this.Size += this.sizeClickBonus
        this.Currency += this.currencyClickBonus
        this.setCounterText()
    }

    decreaseCount() {
        this.Size -= this.sizeClickBonus
        this.Currency -= this.currencyClickBonus
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
            `Size`,
            this.Size,
            `${this.getSizeIdlePerSec()}/s`
        ])
    }

    getSizeIdlePerSec() {
        if (!this.sizeIdleRunning)
            return 0

        return this.sizeIdleBonus / (this.sizeRate / 60)
    }

    setCurrencyText() {
        this.currencyText.setText([
            `Currency`,
            this.Currency,
            `${this.getCurrencyIdlePerSec()}/s`
        ])
    }

    getCurrencyIdlePerSec() {
        if (!this.currencyIdleRunning)
            return 0

        return this.currencyIdleBonus / (this.currencyRate / 60)
    }

    startIdle(type) {
        if (type === 'currency')
            this.currencyIdleRunning = true
        else
            this.sizeIdleRunning = true

        this.setCounterText()
    }

    getBonus(modifiers, baseAmount, tickType) {
        let totalAddition = baseAmount
        let totalMulti = 0
        let totalPercent = 1

        _.each(_.filter(modifiers, {tickType}), ({amount, type})=>{
            switch(type) {
                case 'Multi':
                    totalMulti += amount
                    break
                case 'Percent':
                    totalPercent += amount
                    break
                default:
                    totalAddition += amount
            }
        })

        if(totalMulti === 0)
            totalMulti = 1

        return (totalAddition * totalMulti) * totalPercent
    }

    addModifier(stat, modifier) {
        if(stat === 'size')
            this.sizeModifiers = [...this._sizeModifiers, modifier]
        else
            this.currencyModifiers = [...this._currencyModifiers, modifier]
    }
}