import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('timerDebug', {
    skipArgs: false,
    handler: function () {
        let golem = getScene('StartGame').golem
        let basicResource = getScene('StartGame').getResource('Basic')
        let $btn = $('<button/>').text(`${golem.active ? 'Stop' : 'Start'} Golem Spawner`)
        let $wrapper = $('<div/>')

        let $spawnRateInput = $('<div/>')
            .append($('<label/>').attr('for', 'spawnRateInput').wiki('Spawn Rate (# of Ticks to Spawn): '))
            .append($('<input/>').attr('type', 'number').attr('name', 'spawnRateInput').val(golem.spawnRate).change(function () {
                golem.spawnRate = Number($(this).val())
            }))

        let $spawnAmtInput = $('<div/>')
            .append($('<label/>').attr('for', 'spawnAmtInput').wiki('Spawn Amt (# of Golems to Spawn): '))
            .append($('<input/>').attr('type', 'number').attr('name', 'spawnAmtInput').val(golem.spawnAmt).change(function () {
                golem.spawnAmt = Number($(this).val())
            }))

        let $basicSpawnRateInput = $('<div/>')
            .append($('<label/>').attr('for', 'basicSpawnRateInput').wiki('Basic Spawn Rate: '))
            .append($('<input/>').attr('type', 'number').attr('name', 'basicSpawnRateInput').val(basicResource.spawnRate).change(function () {
                basicResource.spawnRate = Number($(this).val())
            }))

        $btn.click(() => {
            golem.setActive(!golem.active)
            $btn.text(`${golem.active ? 'Stop' : 'Start'} Golem Spawner`)
        })

        $('<div/>').wiki('Game is running at 60 FPS Max, 1 Frame = 1 Tick. 60 Ticks = 1 Second. <br/><br/>').appendTo(this.output)
        $wrapper.append($('<div/>').wiki(`Current Population: `).append($('<span/>').attr('id', 'popCount').wiki(`<<golemPopCounter>>`)))
        $wrapper.append($('<br/>'))

        $spawnRateInput.appendTo($wrapper)
        $spawnAmtInput.appendTo($wrapper)
        $wrapper.append($('<br/>'))

        $basicSpawnRateInput.appendTo($wrapper)

        $wrapper.appendTo(this.output)
        $btn.appendTo(this.output)

    }
})