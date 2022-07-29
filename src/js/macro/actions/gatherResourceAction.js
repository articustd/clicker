import { getScene } from "@GameEngine/Core"

Macro.add('gatherResourceAction', {
    skipArgs: false,
    handler: function () {
        let [actionName] = this.args
        let action = getScene('StartGame').getAction(actionName)
        let $barContainer = $('<div/>').css({'width': '200px', 'height': '30px', 'position': 'relative'})
        let $buttonText = $('<span/>').css({'z-index':'1', 'mix-blend-mode':'difference', 'padding': '5px'}).wiki(actionName)
        let $bar = $('<div/>').css({ 'width': getWidth(action.cooldown, action.baseCooldown), 'height': '100%', 'background-color': 'white', 'position': 'absolute', 'top': '0px', 'left': '0px', 'z-index': '-1' })

        action.on(`${actionName}CooldownChange`, function({cooldown, baseCooldown}) {
            $bar.css({ 'width': getWidth(cooldown, baseCooldown) })
            if (cooldown === baseCooldown) {
                barClick($barContainer, action)
            }
        })

        $barContainer.append($buttonText).append($bar)

        if(action.cooldown === action.baseCooldown)
            barClick($barContainer, action)

        $(this.output).append($barContainer)
    }
})

function getWidth(curr, max) {
    return (curr > 0) ? _.round((curr / max) * 100, 2)+'%' : '0%'
}

function barClick($barContainer, action) {
    $barContainer.css({'cursor':'pointer'})
    $barContainer.click(()=>{
        action.gatherResource()
        $barContainer.css({'cursor':'default'})
        $barContainer.off('click')
    })
}