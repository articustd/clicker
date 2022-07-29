import { logger } from '@util/Logging';
import { WEBGL, Game } from 'phaser'
import { StartGame } from './scenes/StartGame';
import { EventInteraction } from './scenes/EventInteraction';
import { GolemPlugin } from '@GameEngine/gameobjects/golem';
import { ResourcePlugin } from './gameobjects/resources/ResourcePlugin';
import { BuildingPlugin } from './gameobjects/buildings/BuildingPlugin';
import { ActionPlugin } from './gameobjects/actions/ActionPlugin';
import { InteractionPlugin } from './gameobjects/interactions/InteractionPlugin';
import { StoryPlugin } from './gameobjects/story';

const myCustomCanvas = document.createElement('canvas');

myCustomCanvas.id = 'myCustomCanvas';
myCustomCanvas.style = 'border: 8px solid green';

document.body.appendChild(myCustomCanvas);

const contextCreationConfig = {
    alpha: false,
    depth: false,
    antialias: true,
    premultipliedAlpha: true,
    stencil: true,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'default'
};

const myCustomContext = myCustomCanvas.getContext('webgl', contextCreationConfig);

let phaserConfig = {
    type: WEBGL,
    width: 1,
    height: 1,
    canvas: myCustomCanvas,
    context: myCustomContext,
    // fps: {
    //     target: 30,
    //     forceSetTimeOut: true
    // },
    plugins: {
        global: [
            { key: 'ActionPlugin', plugin: ActionPlugin, start: true },
            { key: 'BuildingPlugin', plugin: BuildingPlugin, start: true },
            { key: 'GolemPlugin', plugin: GolemPlugin, start: true },
            { key: 'InteractionPlugin', plugin: InteractionPlugin, start: true },
            { key: 'ResourcePlugin', plugin: ResourcePlugin, start: true },
            { key: 'StoryPlugin', plugin: StoryPlugin, start: true },
        ]
    },
    scene: StartGame
}

const game = new Game(phaserConfig)

function getScene(scene) {
    return game.scene.getScene(scene)
}

function addScene(scene, autoStart, data) {
    game.scene.add(scene, getSceneConfig(scene), autoStart, data)
}

function removeScene(scene) {
    game.scene.remove(scene)
}

function getSceneConfig(scene) {
    switch (scene) {
        case 'EventInteraction':
            return EventInteraction
        default:
            return StartGame
    }
}

export { game, getScene, addScene, removeScene }