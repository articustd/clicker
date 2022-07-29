import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('resourceWorkerControl', {
    skipArgs: false,
    handler: function () {
        let [resourceName] = this.args
        let resource = getScene('StartGame').getResource(resourceName)
        let golem = getScene('StartGame').golem
        let $container = $('<div/>').css({ 'width': '70px', 'height': '30px' })
        let $subBtn = $('<button/>').append($('<i/>').addClass('fa fa-minus')).css({ 'margin-right': '10px', 'border-radius': '5px' }).prop('disabled', resource.workers <= 0)
        let $addBtn = $('<button/>').append($('<i/>').addClass('fa fa-plus')).css({ 'border-radius': '5px' }).prop('disabled', golem.available <= 0)
        $subBtn.click(() => {
            resource.workers -= 1
            golem.available += 1
            $subBtn.prop('disabled', resource.workers <= 0)
        })

        $addBtn.click(() => {
            resource.workers += 1
            golem.available -= 1
            $subBtn.prop('disabled', false)
        })

        golem.on('availablePopChange', function (available) {
            $addBtn.prop('disabled', available <= 0)
        })

        $container
            .append($subBtn)
            .append($addBtn)
            .appendTo(this.output)
    }
})