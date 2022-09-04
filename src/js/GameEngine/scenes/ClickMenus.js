import { logger } from "@util/Logging";
import _ from "lodash";
import { Display, Geom, Scene, Scenes } from "phaser";

export class ClickMenus extends Scene {
    activeMenu
    menuItems

    constructor(key) {
        super(key)
    }

    preload() {
    }

    init(data) {
        this.title = data.title
        this.menu = data.menu
        this.menuItems = []
    }
    
    create() {
        let { width, height } = this.game.canvas
        let transparentLayer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5).setInteractive({ cursor: 'pointer' });
        transparentLayer.on('pointerdown', () => {
            logger('Clicked Menu Background')
            this.scene.sleep()
        })

        let [menuWidth, menuHeight] = [width - (100 * 2), height / 2 + 250]
        let menuWindow = this.add.rectangle(width / 2, height / 2, width, menuHeight, 0xffffff, 0.9).setInteractive();
        menuWindow.on('pointerdown', () => {
            logger('Clicked Menu Window')
        })

        let menuTitleContainer = this.add.rectangle(0, 0, menuWidth, 50, 0xffffff, 0);
        Display.Align.In.TopCenter(menuTitleContainer, menuWindow)

        this.menuTitle = this.add.text(0, 0, this.title, { color: '#000000' });
        Display.Align.In.Center(this.menuTitle, menuTitleContainer)

        let x = width / 2
        let y = this.menuTitle.y + 100
        _.each(this.registry.get(this.menu), (data) => {
            this.menuItems.push(new MenuItem(this, { ...data, width: width - 100, height: 60, x, y }))
            y += 60
        })

        this.events.on(Scenes.Events.WAKE, () => {
            logger("I HAVE AWOKEN")
            let currency = this.scene.get('Counters').Currency
            logger(currency)
            _.each(this.menuItems, (menuItem) => {
                if(!menuItem.purchased)
                    menuItem.checkBuyable(currency)
            })
            // Check every MenuItem to see if they need to be active
        })
    }

    update() { }
}

class MenuItem {
    x
    y
    width
    height
    title

    constructor(scene, menuItemData) {
        this.scene = scene
        this.purchased = false
        _.each(menuItemData, (value, key) => {
            this[key] = value
        })

        let container = scene.add.rectangle(this.x, this.y, this.width, this.height, 0xffffff, 0)

        let titleContainer = scene.add.rectangle(0, 0, this.width / 4, this.height, 0x0000ff, 0);
        Display.Align.In.LeftCenter(titleContainer, container)
        this.titleText = scene.make.text({
            x: 0,
            y: 0,
            text: this.title,
            origin: { x: 0.5, y: 0.5 },
            style: {
                align: 'center',
                fill: '#000000',
                wordWrap: { width: this.width / 4 }
            }
        });
        Display.Align.In.Center(this.titleText, titleContainer)

        let descContainer = scene.add.rectangle(0, 0, this.width / 2, this.height, 0x00ff00, 0);
        Display.Align.In.Center(descContainer, container)
        this.descText = scene.make.text({
            x: 0,
            y: 0,
            text: this.desc,
            origin: { x: 0.5, y: 0.5 },
            style: {
                align: 'center',
                fill: '#000000',
                wordWrap: { width: this.width / 2 }
            }
        });
        Display.Align.In.Center(this.descText, descContainer)

        let costContainer = scene.add.rectangle(0, 0, this.width / 4, this.height, 0xff0000, 0);
        this.costButton = scene.add.rectangle(0, 0, costContainer.width - 10, costContainer.height - 10, 0x808080, 1)
        Display.Align.In.RightCenter(costContainer, container)
        Display.Align.In.Center(this.costButton, costContainer)
        this.costText = scene.add.text(0, 0, `Cost: ${this.cost}`, { color: '#000000' });
        Display.Align.In.Center(this.costText, costContainer)

        scene.registry.events.on('changedata', this.handler, this)

        this.costButton.on('pointerup', () => {
            logger('Here')
            this.buttonAction()
            
            this.markPurchased()
        })

        this.checkBuyable(scene.registry.get('currency'))
    }

    buttonAction() {
        let counters = this.scene.scene.get('Counters')

        switch(this.action) {
            case 'PassiveStart':
                counters.startPassive(this.stat)
                break
        }

    }

    markPurchased() {
        this.scene.registry.events.off('changedata', this.handler, this)
        this.purchased = true

        this.costButton.setFillStyle(0xFFFFFF, 0)
        this.costButton.setStrokeStyle(3, 0x000000, 0)
        this.costButton.removeInteractive()
        this.costText.setText('Purchased!')

        this.scene.scene.get('Counters').decreaseCurrency(this.cost)
    }

    handler(parent, key, data) {
        if (key === 'currency' && !this.purchased)
            this.checkBuyable(data)
    }

    checkBuyable(currentCurrency) {
        if (this.cost <= currentCurrency) {
            this.costButton.setFillStyle(0x808080, 0)
            this.costButton.setStrokeStyle(3, 0x000000, 1)
            this.costButton.setInteractive({ cursor: 'pointer' })
        } else {
            this.costButton.setFillStyle(0x808080, 1)
            this.costButton.setStrokeStyle(3, 0x000000, 0)
            this.costButton.removeInteractive()
        }
    }
}