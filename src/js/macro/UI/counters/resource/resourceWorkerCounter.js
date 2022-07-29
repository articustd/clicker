import { game, getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('resourceWorkerCounter', {
    skipArgs: false,
    handler: function () {
        let [resourceName] = this.args
        let $counter = $('<span/>').wiki(`?${resourceName}WorkerTotal`)

        getScene('StartGame').getResource(resourceName).on(`${resourceName}WorkerChange`, function (workers) { $counter.text(workers) })

        $counter.appendTo(this.output)
    }
})