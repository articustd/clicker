import { addScene, getScene, removeScene } from "@GameEngine/Core"
import * as events from '@js/data/events'
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('startEvent', {
    skipArgs: false,
    handler: function () {
        let [eventName, golems] = this.args
        let golem = getScene('StartGame').golem
        let event = getEvent(eventName)

        if(golems)
            event = {...event, golems}

        logger({event})

        if (getScene('EventInteraction'))
            removeScene('EventInteraction')
        addScene('EventInteraction', true, event)

        let $btn = $('<button/>').wiki(eventName).click(() => {
            Engine.play('eventScenario')
        })

        $btn.prop('disabled', !golem.enoughAvailable(golems))
        golem.on('availablePopChange', () => {
            $btn.prop('disabled', !golem.enoughAvailable(golems))
        })

        $(this.output).append($btn)
    }
})

function getEvent(eventName) {
    return _.find(events, { eventName })
}