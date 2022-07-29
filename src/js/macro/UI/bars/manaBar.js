import { getScene } from "@GameEngine/Core"

Macro.add('manaBar', {
    skipArgs: false,
    tags: null,
    handler: function () {
        let resource = getScene('StartGame').getResource('Mana')
        let $barContainer = $('<div/>').css({ 'width': '100%', 'height': '30px', 'position': 'relative', 'justify-content': 'center', 'display': 'flex', 'align-items': 'center' })
        let $barText = $('<span/>').css({ 'z-index': '1', 'padding': '5px' })
        let $bar = $('<div/>').css({ 'width': getWidth(resource.total, resource.maxAmount), 'height': '100%', 'background-color': 'blue', 'position': 'absolute', 'top': '0px', 'left': '0px', 'z-index': '-1', 'border-radius': '5px' })

        resource.on(`ManaTotalChange`, function (total) { $bar.css({ 'width': getWidth(total, resource.maxAmount) }) })

        if (this.payload[0])
            $barText.wiki(this.payload[0].contents)

        $barContainer
            .append($barText)
            .append($bar)
            .appendTo(this.output)
    }
})

function getWidth(curr, max) {
    return (curr > 0) ? _.round((curr / max) * 100, 2) + '%' : '0%'
}