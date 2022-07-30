import { logger } from "@util/Logging";
import { Geom, Scene } from "phaser";
import { ClickMenus } from "./ClickMenus";
import { Counters } from "./Counters";
import { DemoScene } from "./DemoScene";

export class ClickGame extends Scene {
    text1
    text2
    lastTime

    constructor() {
        super({ key: 'ClickGame' })
    }

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        let sky = this.add.image(400, 300, 'sky').setInteractive();
        let { width, height } = this.game.canvas

        sky.on('pointerdown', (pointer) => this.clickBackground(pointer))

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

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
        })
        this.scene.add('ClickMenus', ClickMenus, true)
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

    clickBackground(pointer) {
        if (pointer.leftButtonDown())
            this.scene.get('Counters').countHandler()
    }
}