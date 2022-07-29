import { game, getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('resourceCounter', {
    skipArgs: false,
    handler: function () {
        let [resourceName] = this.args
        let $counter = $('<span/>').wiki(`?${resourceName}ResourceTotal`)

        getScene('StartGame').getResource(resourceName).on(`${resourceName}TotalChange`, function (total) { $counter.text(total) })

        $counter.appendTo(this.output)
    }
})