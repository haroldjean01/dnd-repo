// imports

import { getEnemies } from '../fetch-utils.js';
import { renderPresets } from '../render-utls.js';

// DOM
const presetEl = document.querySelector('.preset-list');
const enemyButton = document.getElementById('enemy-option');


// States

// Events

enemyButton.addEventListener('click', async () => {
    const enemies = await getEnemies();
    displayEnemyPresets(enemies);
});

// Display

function displayEnemyPresets(presets) {
    presetEl.textContent = '';
    for (let enemy of presets) {
        const target = renderPresets(enemy);
        presetEl.append(target);
    }
}

// debug logs