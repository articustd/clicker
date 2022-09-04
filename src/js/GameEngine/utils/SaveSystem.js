// import { logger } from '@util/Logging'
// import _ from 'lodash'
// import { game, getScene } from '../Core'

// export function saveGameData() {
//     let saveData = {}

//     _.each(game.scene.scenes, (scene) => {
//         saveData[scene.scene.key] = scene.toJSON()
//     })

//     return saveData
// }

// import { addScene, getScene } from "@GameEngine/Core";
// import { logger } from "@util/Logging";
// import _ from "lodash";

// export function loadGameData(GameData) {
//     _.each(GameData, (data, scene)=>{
//         if(!getScene(scene))
//             addScene(scene, true, {})
//         getScene(scene).loadData(data)
//     })
// }