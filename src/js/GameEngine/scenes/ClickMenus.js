import { logger } from "@util/Logging";
import { Display, Geom, Scene, Scenes } from "phaser";

export class ClickMenus extends Scene {

    constructor() {
        super({ key: 'ClickMenus' })
    }

    preload() {
    }

    init(data) {
        logger(data)
        this.title = data.title
    }

    create() {
        let { width, height } = this.game.canvas
        let transparentLayer = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.5).setInteractive({ cursor: 'pointer' });
        transparentLayer.on('pointerdown', () => {
            logger('Clicked Menu Background')
            this.scene.sleep()
        })

        let [menuWidth, menuHeight] = [width-(100*2), height-(50*2)]
        let menuWindow = this.add.rectangle(width/2, height/2, menuWidth,menuHeight, 0xffffff).setInteractive();
        menuWindow.on('pointerdown', () => {
            logger('Clicked Menu Window')
        })

        let menuTitleContainer = this.add.rectangle(0, 0, menuWidth, 50, 0xffffff, 0);
        Display.Align.In.TopCenter(menuTitleContainer, menuWindow)

        this.menuTitle = this.add.text(0, 0, this.title, { color: '#000000'});
        Display.Align.In.Center(this.menuTitle, menuTitleContainer)
        
        this.events.on(Scenes.Events.WAKE, (scene, data) => {
            this.title = data.title
            this.menuTitle.setText(this.title)
            Display.Align.In.Center(this.menuTitle, menuTitleContainer)
        })
    }

    update() {
    }
}