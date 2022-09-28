import { logger } from "@util/Logging";
import { Input, Scene } from "phaser";
import { ClickButtons, Counters, ClickMenus, MessageToaster } from "./UI";
import { BackgroundScene, CharacterScene, ForegroundScene } from './Image'

export class ClickGame extends Scene {
    text1
    text2
    lastTime

    constructor() {
        super({ key: 'ClickGame' })
    }

    create() {
        this.text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
        this.text2 = this.add.text(10, 85, '', { fill: '#00ff00' });
        this.text1.visible = false
        this.text2.visible = false

        this.input.mouse.disableContextMenu()
        this.debugButtons()

        this.registry.set('sizeUpgrades', sizeUpgrades)
        this.registry.set('currencyUpgrades', currencyUpgrades)

        this.scene.add('Background', BackgroundScene, true)
        this.scene.add('Character', CharacterScene, true)
        this.scene.add('Foreground', ForegroundScene, true)
        this.scene.add('MessageToaster', MessageToaster, true)
        this.scene.add('SizeUpgradeMenu', ClickMenus, true, { title: "Size Upgrades", menu: "sizeUpgrades", sleepMenu: "CurrencyUpgradeMenu" })
        this.scene.add('CurrencyUpgradeMenu', ClickMenus, true, { title: "Currency Upgrades", menu: "currencyUpgrades", sleepMenu: "SizeUpgradeMenu" })
        this.scene.add('ClickButtons', ClickButtons, true)
        this.scene.add('Counters', Counters, true)
    }

    update(time, delta) {
        let pointer = this.input.activePointer

        // Check to see if player tabbed out of game
        if (time - this.lastTime > delta + 1000) {
            logger(`Time over normal`)
            logger({ delta, time, lastTime: this.lastTime, timeDiff: time - this.lastTime })
        }
        this.lastTime = time

        this.text1.setText([
            'time: ' + time,
            'delta: ' + delta,
            'x: ' + pointer.worldX,
            'y: ' + pointer.worldY,
            'isDown: ' + pointer.isDown
        ])
    }

    debugButtons() {
        this.input.keyboard.on('keyup', (event) => {
            if (event.keyCode === 38) {
                this.text1.visible = true
                this.text2.visible = true
            }
            if (event.keyCode === 40) {
                this.text1.visible = false
                this.text2.visible = false
            }
            if (event.keyCode === Input.Keyboard.KeyCodes.RIGHT) {
                this.scene.get('Counters').increaseCount()
            }
            if (event.keyCode === Input.Keyboard.KeyCodes.LEFT) {
                this.scene.get('Counters').decreaseCount()
            }
        })
    }
}

let sizeUpgrades = [
    { title: 'Passive Size Start', desc: 'Starts the passive gain on Size', cost: 1, purchased: false, stat: 'size', action: 'PassiveStart' },
    { title: '+2 Size', desc: 'Add +2 to Size Idle', cost: 1, purchased: false, stat: 'size', action: {tickType: 'idle', amount: 2, type: 'Linear'} },
    { title: '50% Size', desc: 'Add 50% to Size Idle', cost: 1, purchased: false, stat: 'size', action: {tickType: 'idle', amount: 0.5, type: 'Percent'} },
    { title: '3x Size', desc: 'Add 3x to Size Idle', cost: 1, purchased: false, stat: 'size', action: {tickType: 'idle', amount: 3, type: 'Multi'} },
    { title: '+2 Size Click', desc: 'Add +2 to Size Click', cost: 1, purchased: false, stat: 'size', action: {tickType: 'click', amount: 2, type: 'Linear'} },
    { title: '50% Size Click', desc: 'Add 50% to Size Click', cost: 1, purchased: false, stat: 'size', action: {tickType: 'click', amount: 0.5, type: 'Percent'} },
    { title: '3x Size Click', desc: 'Add 3x to Size Click', cost: 1, purchased: false, stat: 'size', action: {tickType: 'click', amount: 3, type: 'Multi'} }
]
let currencyUpgrades = [
    { title: 'Passive Currency Start', desc: 'Starts the passive gain on Currency', cost: 1, purchased: false, stat: 'currency', action: 'PassiveStart' },
    { title: '+2 Currency', desc: 'Add +2 to Currency Idle', cost: 1, purchased: false, stat: 'currency', action: {tickType: 'idle', amount: 2, type: 'Linear'} },
    { title: '50% Currency', desc: 'Add 50% to Currency Idle', cost: 1, purchased: false, stat: 'currency', action: {tickType: 'idle', amount: 0.5, type: 'Percent'} },
    { title: '3x Currency', desc: 'Add 3x to Currency Idle', cost: 1, purchased: false, stat: 'currency', action: {tickType: 'idle', amount: 3, type: 'Multi'} },
    { title: '+2 Currency Click', desc: 'Add +2 to Currency Click', cost: 1, purchased: false, stat: 'currency', action: {tickType: 'click', amount: 2, type: 'Linear'} },
    { title: '50% Currency Click', desc: 'Add 50% to Currency Click', cost: 1, purchased: false, stat: 'currency', action: {tickType: 'click', amount: 0.5, type: 'Percent'} },
    { title: '3x Currency Click', desc: 'Add 3x to Currency Click', cost: 1, purchased: false, stat: 'currency', action: {tickType: 'click', amount: 3, type: 'Multi'} }
]