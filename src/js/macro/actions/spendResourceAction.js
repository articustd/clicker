import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('spendResourceAction', {
    skipArgs: false,
    handler: function () {
        let [spendResourceName, amountSpend, getResourceName, amountGet, buttonText] = this.args
        let spendResource = findResource(spendResourceName)
        let getResource = findResource(getResourceName)

        let $button = $('<button/>').wiki((buttonText) ? buttonText : `${amountSpend} ${spendResourceName} => ${amountGet} ${getResourceName}`)

        $button.click(() => {
            if (spendResource.enoughAvailable(amountSpend) && getResource.enoughSpace(amountGet)) {
                spendResource.spend(amountSpend)
                getResource.get(amountGet)
            }
        })

        getEmitter(spendResource, checkDisabled)
        getEmitter(getResource, checkDisabled)

        function checkDisabled() {
            if (spendResource.enoughAvailable(amountSpend) && getResource.enoughSpace(amountGet))
                $button.prop('disabled', false)
            else
                $button.prop('disabled', true)
        }

        checkDisabled()

        $(this.output).append($button)
    }
})

function findResource(resourceName) {
    if (resourceName === 'golem')
        return getScene('StartGame').golem

    return getScene('StartGame').getResource(resourceName)
}

function getEmitter(resource, callback) {
    if(resource.type === 'golem')
        resource.on('availablePopChange', callback)
    else
        resource.on(`${resource.name}TotalChange`, callback)
}