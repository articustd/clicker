import { addScene, getScene } from "@GameEngine/Core";
import { logger } from "@util/Logging";
import _ from "lodash";

export function loadGameData(GameData) {
    _.each(GameData, (data, scene)=>{
        if(!getScene(scene))
            addScene(scene, true, {})
        getScene(scene).loadData(data)
    })
}