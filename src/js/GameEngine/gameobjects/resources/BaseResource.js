import { logger } from "@util/Logging";
import _ from "lodash";
import { GameObjects } from "phaser";

export class BaseResource extends GameObjects.GameObject {
    _tick
    _total
    _workers
    maxAmount
    spawnAmount
    spawnRate

    constructor(scene, resource, maxAmount) {
        super(scene, 'Resource')

        this.name = resource
        this._total = 0
        this.spawnAmount = 1
        this.spawnRate = 600
        this._tick = 0
        this._workers = 0
        if (maxAmount)
            this.maxAmount = maxAmount
    }

    preUpdate(t, dt) {
        if(this.workers>0)
            this.tick += 1
            
        if (this.tick >= this.spawnRate) {
            this.tick -= this.spawnRate
            this.total += this.workers
        }
    }

    timeskip(ticks) {
        while(ticks > 0) {
            --ticks
            this.preUpdate()
        }
    }

    get total() { return this._total }
    set total(total) { this._total = total; this.emit(`${this.name}TotalChange`, total); }

    get tick() { return this._tick; }
    set tick(tick) { this._tick = tick; this.emit(`${this.name}Tick`, { tick: this.tick, spawnRate: this.spawnRate }); }

    get workers() { return this._workers }
    set workers(workers) { this._workers = workers; this.emit(`${this.name}WorkerChange`, workers); }

    spend(amt) {
        if (this.total >= amt) {
            this.total -= amt
            return true
        }
        return false
    }

    get(amt) {
        if (this.enoughSpace(amt)) {
            this.total += amt
            return true
        }
        return false
    }

    enoughAvailable(amt) {
        return this.total >= amt
    }

    enoughSpace(amt) {
        return (!_.isNull(this.maxAmount) && (this.maxAmount - this.total) >= amt) || _.isNull(this.maxAmount)
    }

    toJSON(data) {
        let json = super.toJSON()
        return {
            ...json, ...data,
            active: this.active,
            total: this.total,
            spawnAmount: this.spawnAmount,
            spawnRate: this.spawnRate,
            tick: this.tick,
            workers: this.workers,
            maxAmount: this.maxAmount
        }
    }

    loadData(data) {
        if (data) {
            this.active = data.active
            this.total = data.total
            this.spawnAmount = data.spawnAmount
            this.spawnRate = data.spawnRate
            this.tick = data.tick
            this.workers = data.workers
            this.maxAmount = data.maxAmount
        }
    }
}