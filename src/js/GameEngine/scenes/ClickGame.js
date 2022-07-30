import { logger } from "@util/Logging";
import { Scene } from "phaser";

export class ClickGame extends Scene {
    text1
    text2

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        this.add.image(400, 300, 'sky');

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
        this.text2 = this.add.text(10, 55, '', { fill: '#00ff00' });

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
    }

    update() {
        let pointer = this.input.activePointer

        this.text1.setText([
            'x: ' + pointer.worldX,
            'y: ' + pointer.worldY,
            'isDown: ' + pointer.isDown
        ])
    }
}