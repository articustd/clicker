import { getScene, removeScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('removeScene', {
    skipArgs: false,
    handler: function () {
        let [sceneName] = this.args
        if (getScene(sceneName))
            removeScene(sceneName)
    }
})