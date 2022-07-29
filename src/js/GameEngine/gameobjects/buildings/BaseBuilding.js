import { logger } from "@util/Logging";
import _ from "lodash";
import { GameObjects } from "phaser";

export class BaseBuilding extends GameObjects.GameObject {
    _purchased
    cost
    modifier

    constructor(scene, buildingData) {
        super(scene,'Building')

        this._purchased = false // Buildings are not purchased by default
        _.each(buildingData, (value, key)=>{ // Set all building data provided
            this[key] = value
        })

    }

    preUpdate(t, dt) {}

    get purchased() { return this._purchased }
    set purchased(purchased) { this._purchased = purchased; this.emit(`PurchasedChange`, purchased); }

    toJSON(data) {
        let json = super.toJSON()
        return {...json, ...data, purchased: this.purchased}
    }

    loadData(data) {
        if(data) {
            this.purchased = data.purchased
        }
    }
}