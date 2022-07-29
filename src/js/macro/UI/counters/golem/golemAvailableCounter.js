import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('golemAvailableCounter', {
    skipArgs: false,
    handler: function () {
        let $counter = $('<span/>').wiki('?golemAvailable')

        getScene('StartGame').golem.on('availablePopChange', function (available) { $counter.text(available) })

        $counter.appendTo(this.output)
    }
})