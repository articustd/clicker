import { logger } from "@util/Logging";
import _ from "lodash";
import { GameObjects, Plugins } from "phaser";

export class StoryObject extends GameObjects.GameObject {
    storySnippets
    actSnippets
    acts

    constructor(scene, startingDesc) {
        super(scene, 'Story')

        this.storySnippets = []
        this.storySnippets.push(_.sample(startingDesc))
    }

    preUpdate(t, dt) { }

    activateInteractions(interactionList) {
        let interactions = _.filter(this.scene.interactions, (interaction) => {
            return !interaction.active && _.includes(interactionList, interaction.name)
        })
        _.each(interactions, (interaction) => {
            interaction.active = true
        })
    }

    clearActiveInteractions() {
        _.each(_.filter(this.scene.interactions, { active: true }), (interaction) => {
            interaction.active = false
        })
    }

    push(snippet) {
        this.storySnippets.push(snippet)
        this.emit('StoryUpdate', { idx: this.storySnippets.length, snippet })
    }
}

export class StoryPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('story', this.createStory)
    }

    createStory(startingDesc) { return this.updateList.add(new StoryObject(this.scene, startingDesc)) }
}