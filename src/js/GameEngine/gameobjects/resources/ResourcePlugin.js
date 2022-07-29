import { Plugins } from "phaser"
import { BaseResource } from "./BaseResource"

export class ResourcePlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('resource', this.createResource)
    }
    createResource(resourceName, maxAmount) {return this.updateList.add(new BaseResource(this.scene, resourceName, maxAmount))}
}