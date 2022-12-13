// imports

import { createEnemy, getEnemyPresets, getPlayers, getUser, uploadImage, getEnemies } from '../fetch-utils.js';
import { renderEnemies, renderPresets } from '../render-utls.js';

// DOM
const presetEl = document.querySelector('.preset-list');
const formEl = document.querySelector('#create-form');
const enemiesButton = document.getElementById('enemy-option');
const playersButton = document.getElementById('player-option');
const addEnemyButton = document.getElementById('add-enemy');
const addPlayerButton = document.getElementById('add-player');
const enemiesDivEl = document.getElementById('enemies-div');
const formClear = document.getElementById('clear-form');

// States

// Events
addEnemyButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const user = await getUser();
    const data = new FormData(formEl);
    const enemyObject = {
        name: data.get('name'),
        ac: data.get('armor'),
        hp: data.get('hp'),
        init: data.get('init'),
    };
    const imageFile = data.get('image');
    if (imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imagePath, imageFile);

        enemyObject.image = url;
        console.log('url', url);
    }

    await createEnemy(enemyObject);
    fetchAndDisplayEnemies();
    formEl.reset();
});

self.addEventListener('load', async () => {
    fetchAndDisplayEnemies();
});

enemiesButton.addEventListener('click', async () => {
    const enemies = await getEnemyPresets();
    displayPresets(enemies);
});

playersButton.addEventListener('click', async () => {
    const players = await getPlayers();
    displayPresets(players);
});

formClear.addEventListener('click', () => {
    formEl.reset();
});

// Display

async function fetchAndDisplayEnemies() {
    enemiesDivEl.textContent = '';

    const enemies = await getEnemies();
    for (let enemy of enemies) {
        const enemyEl = renderEnemies(enemy);
        enemiesDivEl.append(enemyEl);
    }
}

function displayPresets(presets) {
    presetEl.textContent = '';
    for (let data of presets) {
        const target = renderPresets(data);
        presetEl.append(target);
    }
}


// debug logs
