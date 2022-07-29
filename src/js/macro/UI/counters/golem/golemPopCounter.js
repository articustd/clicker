import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('golemPopCounter', {
    skipArgs: false,
    handler: function () {
        let $counter = $('<span/>').wiki('?golemPop')

        getScene('StartGame').golem.on('popChange', function (pop) { $counter.text(pop) })

        $counter.appendTo(this.output)
    }
})