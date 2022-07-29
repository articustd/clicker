import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('hideUntilBuilt', {
    skipArgs: false,
    tags: null,
    handler: function () {
        let [buildingName] = this.args
        let building = getScene('StartGame').getBuilding(buildingName)
        let $wrapper = $('<div/>').css('display', (building.purchased) ? 'block' : 'none').wiki(this.payload[0].contents)

        if (!building.purchased)
            building.on('PurchasedChange', (purchased) => {
                if (purchased)
                    $wrapper.css('display', 'block')
            })

        $(this.output).append($wrapper)
    }
})
