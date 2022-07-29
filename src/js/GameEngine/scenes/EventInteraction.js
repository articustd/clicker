import { getScene } from "@GameEngine/Core";
import { logger } from "@util/Logging";
import _ from "lodash";
import { Scene } from "phaser";

export class EventInteraction extends Scene {
    name
    interactions
    story
    leadsTo
    golems
    passives
    passiveSnippets
    passiveMin
    passiveCounter

    constructor() {
        super("EventInteraction")
    }

    create(data) {
        this.name = data.eventName
        this.golems = data.golems
        this.interactions = _.map(data.interactions, (interaction) => {
            return this.add.interaction(interaction)
        })
        this.passives = data.passives
        this.passiveSnippets = []
        this.passiveMin = 600
        this.passiveCounter = 0
        this.story = this.add.story(data.startingDesc)
        logger(this)
    }

    update(t, dt) {
        if(this.passiveSnippets.length > 0) {
            this.passiveCounter++
            let rand = _.random(1, 10000)
            if (rand > 9990)
                logger(rand)
            if(this.passiveCounter > this.passiveMin && rand > 9990){
                this.story.push(this.getRandomSnippet())
                this.passiveCounter = 0
            }
        }
    }

    consumeGolems(amt = this.golems) {
        getScene('StartGame').golem.spend(amt)
    }

    changePassiveSnippets(name) {
        this.passiveSnippets = _.find(this.passives, {name}).snippets
        this.passiveCounter = 0
    }

    getRandomSnippet() {
        let snippet = _.sample(this.passiveSnippets)
        if(snippet === _.last(this.story.storySnippets))
            snippet = this.getRandomSnippet()
        return snippet
    }

    toJSON() {
        let interactions = _.map(this.interactions, (interaction) => { return interaction.toJSON() })
        return {
            name: this.name,
            interactions
        }
    }

    loadData(data) {
        this.name = data.name
        _.each(this.interactions, (interaction) => { interaction.loadData(_.find(data.interactions, { name: interaction.name })) })
    }

    getActiveInteractions() { return _.filter(this.interactions, { active: true }) }

    getInteraction(name) { return _.find(this.interactions, { name }) }
}