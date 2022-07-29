import { Plugins } from "phaser"
import { BaseAction } from "./BaseAction"

export class ActionPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('action', this.action)
    }

    action(actionData) { return this.updateList.add(new BaseAction(this.scene, actionData)) }
}