import { logger } from '@util/Logging'
import _ from 'lodash'
import { game, getScene } from '../Core'

export function saveGameData() {
    let saveData = {}

    _.each(game.scene.scenes, (scene) => {
        saveData[scene.scene.key] = scene.toJSON()
    })

    return saveData
}