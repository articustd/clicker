import { addScene, getScene, removeScene } from "@GameEngine/Core"
import * as events from "@js/data/events"
import { logger } from "@util/Logging"

Macro.add('testSceneAdd', {
    skipArgs: false,
    handler: function () {
        if (getScene('EventInteraction'))
            removeScene('EventInteraction')

        logger(_.find(events, {eventName:'Pickup Golem'}))
        addScene('EventInteraction', true, _.find(events, {eventName:'Pickup Golem'}))
    }
})