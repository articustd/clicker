import { getScene } from "@GameEngine/Core"

Macro.add('gameStart', {
    skipArgs: false,
    handler: function () {
        getScene('StartGame').golem.setActive(true)
        variables().started = true
    }
})