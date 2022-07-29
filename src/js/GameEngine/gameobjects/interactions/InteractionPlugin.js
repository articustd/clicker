import { Plugins } from "phaser"
import { BaseInteraction } from "./BaseInteraction"

export class InteractionPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('interaction', this.interaction)
    }

    interaction(interactionData) { return this.updateList.add(new BaseInteraction(this.scene, interactionData)) }
}