import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

export function showHUD() {
    let gatheringHut = getScene('StartGame').getBuilding('Gathering Hut')
    let workshop = getScene('StartGame').getBuilding('Workshop')
    let $container = $('<div/>').attr('id', 'hud')
    $container.append($('<div/>').wiki(`''Golem''<div><<golemAvailableCounter>>/<<golemPopCounter>></div>`).addClass('hudItem'))
    $container.append($('<div/>').wiki(`<<manaBar>>''Mana''<</manaBar>>`).addClass('hudItem'))
    $container.append($('<span/>').wiki(`''Basic''<<resourceCounter 'Basic'>>`).addClass('hudItem'))

    showResource(gatheringHut, 'Complex', $container)
    showResource(workshop, 'Advanced', $container)
    // if (!gatheringHut.purchased)
    //     gatheringHut.on('PurchasedChange', (purchased) => {
    //         if (purchased)
    //             $container.append($('<span/>').wiki(`''Complex''<<resourceCounter 'Complex'>>`).addClass('hudItem'))
    //     })
    // else
    //     $container.append($('<span/>').wiki(`''Complex''<<resourceCounter 'Complex'>>`).addClass('hudItem'))

    $('#passages').before($container)
}

function showResource(building, resource, $container) {
    if (!building.purchased) {
        building.on('PurchasedChange', (purchased) => {
            if (purchased)
                $container.append($('<span/>').wiki(`''${resource}''<<resourceCounter '${resource}'>>`).addClass('hudItem'))
        })
    }
    else
        $container.append($('<span/>').wiki(`''${resource}''<<resourceCounter '${resource}'>>`).addClass('hudItem'))
}