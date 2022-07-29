import { getTicks, hoursToMinutes } from "@GameEngine/utils/tickTime";
import { logger } from "@util/Logging";
import _ from "lodash";
import { GameObjects } from "phaser";

export class BaseAction extends GameObjects.GameObject {
    _cooldown
    baseCooldown
    resource
    amount

    constructor(scene, actionData) {
        super(scene, 'Action')

        _.each(actionData, (value, key) => {
            this[key] = value
        })
        this._cooldown = this.baseCooldown
    }

    preUpdate(t, dt) {
        if (this.cooldown < this.baseCooldown)
            this.cooldown += 1
    }

    get cooldown() { return this._cooldown }
    set cooldown(cooldown) { this._cooldown = cooldown; this.emit(`${this.name}CooldownChange`, {cooldown:this.cooldown, baseCooldown:this.baseCooldown}); }

    gatherResource() { 
        this.cooldown = 0
        this.scene.getResource(this.resource).total += this.amount
    }

    timeSkipHour(hours) {
        this.timeSkipMinute(hoursToMinutes(hours))
    }

    timeSkipMinute(minutes) {
        let ticks = getTicks(minutes)
        this.scene.golem.timeskip(ticks)
        _.each(this.scene.resources, (resource)=>{resource.timeskip(ticks)})
    }

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