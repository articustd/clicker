import { logger } from "@util/Logging";
import { Geom, Input, Scene } from "phaser";
import { ClickButtons } from "./ClickButtons";
import { Counters } from "./ClickCounters";
import { ClickMenus } from "./ClickMenus";

export class ClickGame extends Scene {
    text1
    text2
    lastTime

    constructor() {
        super({ key: 'ClickGame' })
    }

    preload() {
        // this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/levels/prototype/background/Background1.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        let { width, height } = this.game.canvas
        let sky = this.add.image(width/2, height/2, 'sky').setInteractive();
        
        sky.on('pointerdown', (pointer) => this.clickBackground(pointer))

        // var particles = this.add.particles('red');

        // var emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });

        // var logo = this.physics.add.image(400, 100, 'logo');

        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);

        // emitter.startFollow(logo);

        this.text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
        this.text2 = this.add.text(10, 85, '', { fill: '#00ff00' });
        this.text1.visible = false
        this.text2.visible = false

        this.input.mouse.disableContextMenu()

        this.input.on('pointerup', (pointer) => {
            if (pointer.leftButtonReleased())
                this.text2.setText('Left Button Released')
            if (pointer.rightButtonReleased())
                this.text2.setText('Right Button Released')
            if (pointer.middleButtonReleased())
                this.text2.setText('Middle Button Released')
            if (pointer.backButtonReleased())
                this.text2.setText('Back Button Released')
            if (pointer.forwardButtonReleased())
                this.text2.setText('Forward Button Released')
        })

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown())
                this.text2.setText('Left Button Down')
            if (pointer.rightButtonDown())
                this.text2.setText('Right Button Down')
            if (pointer.middleButtonDown())
                this.text2.setText('Middle Button Down')
            if (pointer.backButtonDown())
                this.text2.setText('Back Button Down')
            if (pointer.forwardButtonDown())
                this.text2.setText('Forward Button Down')
        })
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
        this.scene.add('ClickButtons', ClickButtons, true)
        this.scene.add('Counters', Counters, true)
        this.scene.add('SizeUpgradeMenu', ClickMenus, false, {title: "Size Upgrades", menu: "sizeUpgrades"})
        this.scene.add('CurrencyUpgradeMenu', ClickMenus, false, {title: "Currency Upgrades", menu: "currencyUpgrades"})
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

    clickBackground(pointer) {
        if (pointer.leftButtonDown())
            this.scene.get('Counters').increaseCount()
    }
}