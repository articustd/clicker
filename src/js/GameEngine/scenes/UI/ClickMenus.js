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
        this.sleepMenu = data.sleepMenu
        this.menuItems = []
    }

    create() {
        let { width, height } = this.game.canvas
        let transparentLayer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5).setInteractive({ cursor: 'pointer' });
        transparentLayer.on('pointerdown', () => {
            logger('Clicked Menu Background')
            this.scene.sleep()
        })

        let menuHeight = height / 2 + 250

        this.panel = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: height / 2,
            width: width,
            height: menuHeight,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xffffff, 0.8),

            panel: {
                child: this.rexUI.add.fixWidthSizer({
                    space: {
                        left: 3,
                        right: 3,
                        top: 3,
                        bottom: 3,
                        item: 8,
                        line: 8,
                    },
                }),
                mask: {
                    mask:true,
                    padding: 1,
                }
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 5, 0x000000),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 8, 0x000000),
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 50,
                orientation: 0,
                align: 'center',
                text: this.add.text(0, 0, this.title, { color: '#000000' })
            }),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                header: 10,
                footer: 10,
            }
        }).layout();

        updatePanel(this.panel, width)

        this.events.on(Scenes.Events.WAKE, () => {
            this.scene.sleep(this.sleepMenu)

            this.panel.layout()
        })

        this.scene.sleep()
    }

    update() { }
}

var updatePanel = function (panel, width) {
    let scene = panel.scene
    let sizer = panel.getElement('panel')

    sizer.clear(true);
    _.each(scene.registry.get(scene.menu), (data) => {
        scene.menuItems.push(new MenuItem(scene, sizer, { ...data, width: width - 50, height: 60 }))
    })
}

class MenuItem {
    width
    height
    title
    desc

    constructor(scene, sizer, menuItemData) {
        this.scene = scene
        this.sizer = sizer
        this.purchased = false

        _.each(menuItemData, (value, key) => {
            this[key] = value
        })

        let menuContainer = scene.add.container(0, 0).setSize(this.width, this.height)
        let outline = menuContainer.add(scene.add.rectangle(0, 0, this.width, this.height, 0xffffff, 0).setStrokeStyle(1, 0x000000))

        this.titleText = menuContainer.add(scene.make.text({
            x: -(this.width / 2) + (this.width / 8) + 10,
            y: 0,
            text: this.title,
            origin: { x: 0.5, y: 0.5 },
            style: {
                align: 'center',
                fill: '#000000',
                wordWrap: { width: this.width / 4 }
            }
        }).setPadding(20, 0, 20, 0));

        this.descText = menuContainer.add(scene.make.text({
            x: 0,
            y: 0,
            text: this.desc,
            origin: { x: 0.5, y: 0.5 },
            style: {
                align: 'center',
                fill: '#000000',
                wordWrap: { width: this.width / 2 }
            }
        }).setPadding(20, 0, 20, 0))

        this.costButton = scene.add.rectangle(this.width / 2 - (this.width / 8), 0, (this.width / 4) - 10, this.height - 10, 0x808080, 1)
        menuContainer.add(this.costButton)
        this.costText = scene.add.text(this.width / 2 - (this.width / 8), 0, `Cost: ${this.cost}`, { color: '#000000' }).setOrigin(0.5, 0.5)
        menuContainer.add(this.costText)

        scene.registry.events.on('changedata', this.handler, this)

        this.costButton.on('pointerup', () => {
            this.buttonAction()

            this.markPurchased()
        })

        this.checkBuyable(scene.registry.get('currency'))
        sizer.add(menuContainer)
    }

    buttonAction() {
        let counters = this.scene.scene.get('Counters')

        if (this.action === 'PassiveStart') {
            counters.startIdle(this.stat)
            return
        }

        counters.addModifier(this.stat, this.action)
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