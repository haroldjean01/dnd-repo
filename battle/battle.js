// imports

import { getEnemies, getPlayers } from '../fetch-utils.js';
import { renderPresets } from '../render-utls.js';

// DOM
const presetEl = document.querySelector('.preset-list');
const enemiesButton = document.getElementById('enemy-option');
const playersButton = document.getElementById('player-option');


// States

// Events

enemiesButton.addEventListener('click', async () => {
    const enemies = await getEnemies();
    displayPresets(enemies);
});

playersButton.addEventListener('click', async () => {
    const players = await getPlayers();
    displayPresets(players);
});

// Display

function displayPresets(presets) {
    presetEl.textContent = '';
    for (let data of presets) {
        const target = renderPresets(data);
        presetEl.append(target);
    }
}

// debug logs