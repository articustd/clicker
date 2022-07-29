import { GameObjects } from "phaser";
import { logger } from "@util/Logging";
import _ from "lodash";
import { getScene } from "@GameEngine/Core";

export class BaseInteraction extends GameObjects.GameObject {
    _cooldown
    baseCooldown
    interval
    leadsTo
    clear
    snippets
    _counter
    baseCounter
    progressInteractions
    passive
    final
    consume
    classes

    constructor(scene, interactionData) {
        super(scene, 'Interaction')

        this.consume = false
        this.clear = false
        this.final = false
        this._counter = 0
        this.baseCounter = 0
        this.progressInteractions = []
        _.each(interactionData, (value, key) => {
            this[key] = value
        })
        this._cooldown = this.baseCooldown + 1
        this.interval = (this.snippets.length > 1) ? _.floor(this.baseCooldown / this.snippets.length) : this.baseCooldown
    }

    preUpdate(t, dt) {
        if (this.cooldown % this.interval === 0)
            this.pushSnippet()
        if (this.cooldown <= this.baseCooldown)
            this.cooldown += 1
    }

    fire() {
        if (this.clear)
            this.scene.story.clearActiveInteractions()
        if (this.consume)
            this.scene.consumeGolems()
        if (this.passive)
            this.scene.changePassiveSnippets(this.passive)
        this.pushSnippet()
        this.progressOthers()
    }

    isDisabled() {
        return this.counter < this.baseCounter
    }

    pushSnippet() {
        this.scene.story.push(_.sample(this.snippets))
        this.scene.story.activateInteractions(this.leadsTo)
    }

    progressOthers() {
        _.each(this.progressInteractions, (name) => {
            _.find(this.scene.interactions, { name }).progress()
        })
    }

    progress(amt = 1) {
        this.counter += amt
    }

    get active() { return this._active }
    set active(active) { this._active = active; this.counter = 0; this.emit(`${this.name}ActiveChange`, active); }

    get cooldown() { return this._cooldown }
    set cooldown(cooldown) { this._cooldown = cooldown; this.emit(`${this.name}CooldownChange`, { cooldown: this.cooldown, baseCooldown: this.baseCooldown }); }

    get counter() { return this._counter }
    set counter(counter) { this._counter = counter; this.emit(`${this.name}CounterChange`, counter); }

    toJSON(data) {
        let json = super.toJSON()
        return { ...json, ...data, cooldown: this.cooldown }
    }

    loadData(data) {
        if (data) {
            this._cooldown = data.cooldown
        }
    }
}