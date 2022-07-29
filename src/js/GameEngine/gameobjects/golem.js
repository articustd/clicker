import { logger } from "@util/Logging";
import { GameObjects, Plugins } from "phaser";

export class GolemGameObject extends GameObjects.GameObject {
    _available
    _currSpawnRate
    _developmentLevel
    _population
    spawnAmt
    spawnRate

    constructor(scene) {
        super(scene, 'golem')

        this.name = 'Golem'
        this.active = false

        this._population = 1
        this._available = this._population
        this.spawnRate = 600
        this.spawnAmt = 1
        this._currSpawnRate = 0
        this._developmentLevel = 0
    }

    preUpdate(t, dt) {
        if (this.available > 0)
            this.currSpawnRate += 1

        if (this.currSpawnRate >= this.spawnRate) {
            this.currSpawnRate -= this.spawnRate
            this.get(this.spawnAmt)
        }
    }

    timeskip(ticks) {
        while (ticks > 0) {
            --ticks
            this.preUpdate()
        }
    }

    get population() { return this._population }
    set population(population) { this._population = population; this.emit('popChange', population); }

    get available() { return this._available }
    set available(available) { this._available = available; this.emit('availablePopChange', available) }

    get currSpawnRate() { return this._currSpawnRate }
    set currSpawnRate(currSpawnRate) { this._currSpawnRate = currSpawnRate; this.emit('popTick', { currSpawnRate: this.currSpawnRate, spawnRate: this.spawnRate }); }

    get developmentLevel() { return this._developmentLevel }
    set developmentLevel(developmentLevel) { this._developmentLevel = developmentLevel; this.emit('DevelopmentLevelChange', developmentLevel); }

    spend(amt) {
        if (this.enoughAvailable(amt)) {
            this.population -= amt
            this.available -= amt
            return true
        }
        return false
    }

    get(amt) {
        this.population += amt
        this.available += amt
        return true
    }

    enoughAvailable(amt) {
        return (this.available - amt) >= 0 && (this.population - amt) >= 1
    }

    enoughSpace() {
        return true
    }

    getDevelopment() {
        switch (this.developmentLevel) {
            case 0:
                return 'None'
            case 1:
                return 'Autonomous'
            case 2:
                return 'Primitive'
            case 3:
                return 'Simple'
            case 4:
                return 'Medieval'
            case 5:
                return 'Industrial'
            case 6:
                return 'Modern'
            case 7:
                return 'Futuristic'
            default:
                return 'Broken'
        }
    }

    toJSON() {
        let json = super.toJSON()
        return {
            ...json,
            active: this.active,
            population: this.population,
            spawnAmt: this.spawnAmt,
            spawnRate: this.spawnRate,
            currSpawnRate: this.currSpawnRate,
            available: this.available,
            developmentLevel: this.developmentLevel
        }
    }

    loadData(data) {
        if (data) {
            this.active = data.active
            this.available = data.available
            this.population = data.population
            this.spawnAmt = data.spawnAmt
            this.spawnRate = data.spawnRate
            this.currSpawnRate = data.currSpawnRate
            this.developmentLevel = data.developmentLevel
        }
    }
}

export class GolemPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('golem', this.createGolem)
    }

    createGolem() { return this.updateList.add(new GolemGameObject(this.scene)) }
}