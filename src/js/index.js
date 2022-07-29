import storyConfig from './config.json'

import macros from './macro'
import templates from './template'

import Core, { game, getScene } from './GameEngine/Core'
import { logger } from '@util/Logging'
import { loadGameData, saveGameData } from '@GameEngine/utils'
import { showHUD } from './resourceHUD'
Config = {
	...Config, ...storyConfig, saves: {
		autoload: checkAutoload(),
		autosave: false,
		id: 'village',
		isAllowed: function () { return State.passage !== 'Start' },
		slots: 8
	}
};

setup.ImagePath = "assets/";

((Config, State, Story, Engine, Dialog, $document) => {
	$(document.head).append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css" integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossorigin="anonymous">')

	// Set State Variables
	variables().debug = Config.debug
	variables().version = 'Pre-Alpha'

	// Config Auto Load if not on Start passage
	// Fixes Phaser not being avaliable on initial render
	$(document).on(':storyready', function (ev) {
		if (checkAutoload())
			Save.autosave.load()
		else
			Engine.show()
	})

	// Setup noreturn
	$(document).on(':passagestart', function (ev) {
		loadPhaser(LoadScreen.lock(), ev)
	});

	// Config saving
	Save.onSave.add(function (save, details) {
		logger('Saving...')
		switch (details.type) {
			case 'serialize':
				logger('serialize')
				break
			case 'autosave':
			case 'disk':
			default:
				save.GameData = saveGameData()
		}
	})

	// Config loading
	Save.onLoad.add(function (save) {
		logger('Loading...')
		loadGameData(save.GameData)
	})
})(Config, State, Story, Engine, Dialog, $(document));

function checkAutoload() {
	return State.passage !== 'Start' && !_.isEmpty(State.passage) && Save.autosave.ok()
}

function passageStartRoutine(ev) {
	if (!ev.passage.tags.includes('noreturn'))
		variables().return = ev.passage.title;
	if (!ev.passage.tags.includes('nohud') && !$('#hud').length)
		showHUD()
}

function loadPhaser(lockID, ev) {
	if (!getScene('StartGame'))
		setTimeout(loadPhaser, 50, lockID, ev)
	else {
		passageStartRoutine(ev)
		LoadScreen.unlock(lockID)
	}
}