import { getPrimary, getPrimaryFont, getSecondary } from "@GameEngine/utils/Theme";
import { logger } from "@util/Logging";
import { Queue } from "@util/Queue";
import _, { size } from "lodash";
import { Display, Scene } from "phaser";

export class MessageToaster extends Scene {
    constructor() {
        super({ key: 'MessageBox' })

        this._currentMessageData = 0
        this.messageQueue = new Queue()
    }

    preload() {
        this.messageData = [
            {
                sizeGate: 1, timer: -1, variance: 1, queueSize: 1, messages: [
                    { header: 'Dragonien', body: '~Whoops~ Spilled some chemicals' },
                    { header: 'Dragonien', body: 'Hope nothing bad happens' }]
            },
            {
                sizeGate: -1, timer: 900, variance: 100, queueSize: 3, messages: [
                    { header: '...', body: 'Deep rumbling can be heard from Dragonien' },
                    { header: 'Dragonien', body: 'I can feel something happening on occasion' },
                    { header: 'Dragonien', body: 'Maybe it slowed down?' },
                    { header: '...', body: 'Subtle cracking noises can be heard' }
                ]
            }
        ]
    }

    create() {
        let { width, height } = this.game.canvas
        let [alpha, borderHeight] = [0.8, 10]

        this.toastContainer = this.add.container(width / 2, 300).setVisible(false)
        this.toastBody = this.add.rectangle(0, 95, width, 180, getPrimary(), alpha)

        this.nameHeader = this.add.text(-(width / 2) + 30, 20, '', { fill: getPrimaryFont(true), fontStyle: 'bold', fontSize: '28px' })
        this.messageBody = this.add.text(-(width / 2) + 40, 60, '', { fill: getPrimaryFont(true), fontSize: '16px' }).setWordWrapWidth(width - 80)

        this.toastContainer.add(this.toastBody)
        this.toastContainer.add(this.add.rectangle(0, 0, width, borderHeight, getSecondary(), alpha))
        this.toastContainer.add(this.add.rectangle(0, 190, width, borderHeight, getSecondary(), alpha))

        this.toastContainer.add(this.nameHeader)
        this.toastContainer.add(this.messageBody)

        this.toastBody.setInteractive({ cursor: 'pointer' })
        this.toastBody.on('pointerdown', this.nextMessage, this)

        this.registry.events.on('changedata', this.updateCurrentIdx, this)

        this.messageQueue.max = this.currentMessageData.queueSize
        this.currentMessageTick = 0
        if (this.currentMessageData.timer === -1)
            this.messageShow(0)
    }

    update() {
        if (this.toastContainer.visible)
            return

        if (this.timer === -1)
            return

        ++this.currentMessageTick
        if (this.currentMessageTick >= this.messageVariance()) {
            let messageIdx = this.getRandomMessage()
            this.messageShow(messageIdx)
            this.currentMessageTick = 0
        }
    }

    get currentMessageData() { return this.messageData[this._currentMessageData] }
    get currentMessages() { return this.currentMessageData.messages }
    get sizeGate() { return this.currentMessageData.sizeGate }
    get timer() { return this.currentMessageData.timer }
    get variance() { return this.currentMessageData.variance }

    getRandomMessage() {
        let messageIdx = _.random(0, this.currentMessages.length - 1)    
        if (_.find(this.messageQueue.queue, (o)=>{return o === messageIdx}) !== undefined)
            messageIdx = this.getRandomMessage()
        return messageIdx
    }

    nextMessage() {
        // Go to next narrative
        if (this.timer === -1) {
            if (this.currentMessages.length - 1 !== this.messageQueue.queue[0]) {
                this.messageShow(++this.messageQueue.queue[0])
                return
            }
        }
        // Close window
        this.messageHide()
    }

    messageHide() {
        this.toastContainer.setVisible(false)
    }

    messageShow(messageIdx) {
        this.nameHeader.setText(this.currentMessages[messageIdx].header)
        this.messageBody.setText(this.currentMessages[messageIdx].body)

        this.toastContainer.setVisible(true)
        this.messageQueue.enqueue(messageIdx)
    }

    messageVariance() {
        return _.random(this.timer - this.variance, this.timer + this.variance)
    }

    updateCurrentIdx(parent, key, data) {
        if (key !== 'size' || this.toastContainer.visible)
            return

        if (this.sizeGate <= data && this.sizeGate > -1)
            this.incrementMessageData()
    }

    incrementMessageData() {
        ++this._currentMessageData
        this.messageQueue.clear()
        this.messageQueue.max = this.currentMessageData.queueSize
    }
}