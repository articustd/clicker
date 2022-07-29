import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('interactionList', {
    skipArgs: false,
    handler: function () {
        let event = getScene('EventInteraction')

        _.each(event.interactions, (interaction) => {
            let $btn = $('<button/>').wiki(interaction.name).click(() => {
                interaction.fire()
                if (interaction.final) {
                    let $returnBtn = $('<button/>').wiki('Return').click(() => {
                        Engine.play(variables().return)
                    })
                    $(this.output).append($returnBtn)
                }
            })

            if (!interaction.active)
                $btn.addClass('hide')
            else
                $btn.addClass(interaction.classes)
                
            interaction.on(`${interaction.name}ActiveChange`, (active) => {
                if (active)
                    $btn.removeClass('hide')
                else
                    $btn.addClass('hide')
            })

            interaction.on(`${interaction.name}CounterChange`, (counter) => {
                calcBackgroundSize(interaction, $btn)
                $btn.prop('disabled', interaction.isDisabled())
                if (interaction.isDisabled())
                    $btn.removeClass(interaction.classes)
                else
                    $btn.addClass(interaction.classes)
            })
            $btn.prop('disabled', interaction.isDisabled())
            $(this.output).append($btn)
        })
    }
})

function calcBackgroundSize({ counter, baseCounter }, $btn) {
    if (counter > 0 && baseCounter > 0) {
        let percent = _.floor((counter / baseCounter) * 100)
        $btn.css({ 'background-size': `${percent}% ${percent}%` })
    } else
        $btn.css({ 'background-size': `0% 0%` })
}