// imports

import {
    createEnemy,
    getEnemyPresets,
    getPlayers,
    getUser,
    uploadImage,
    getEnemies,
    createPlayer,
    getPlayerPresets,
} from '../fetch-utils.js';
import { renderEnemies, renderPlayers, renderPresets } from '../render-utls.js';

// DOM
const presetEl = document.querySelector('.preset-list');
const presetList = document.querySelector('.preset-ul');
const formEl = document.querySelector('#create-form');
const enemiesButton = document.getElementById('enemy-option');
const playersButton = document.getElementById('player-option');
const addEnemyButton = document.getElementById('add-enemy');
const addPlayerButton = document.getElementById('add-player');
const enemiesDivEl = document.getElementById('enemies-div');
const playersDivEl = document.getElementById('players-div');
const formClear = document.getElementById('clear-form');
const imagePreview = document.getElementById('image-preview');
const debugButton = document.getElementById('debug');
const nameInput = document.getElementById('name-input');

// form Elements
const imageInput = document.querySelector('[name=image]');
const name = document.querySelector('[name=name]');
const ac = document.querySelector('[name=armor]');
const init = document.querySelector('[name=init]');
const hp = document.querySelector('[name=hp]');

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
    }

    await createEnemy(enemyObject);
    fetchAndDisplayEnemies();
    formEl.reset();
});

addPlayerButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const user = await getUser();
    const data = new FormData(formEl);
    const playerObject = {
        name: data.get('name'),
        ac: data.get('armor'),
        hp: data.get('hp'),
        init: data.get('init'),
    };
    const imageFile = data.get('image');
    if (imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imagePath, imageFile);

        playerObject.image = url;
    }

    await createPlayer(playerObject);
    fetchAndDisplayPlayers();
    formEl.reset();
});

self.addEventListener('load', async () => {
    fetchAndDisplayEnemies();
    fetchAndDisplayPlayers();
});

enemiesButton.addEventListener('click', async () => {
    presetList.textContent = '';

    const enemies = await getEnemyPresets();
    displayPresets(enemies);
});

playersButton.addEventListener('click', async () => {
    presetList.textContent = '';

    const players = await getPlayerPresets();
    displayPresets(players);
});

// playersButton.addEventListener('click', async () => {
//     const players = await getPlayers();
//     displayPresets(players);
// });

formClear.addEventListener('click', () => {
    formEl.reset();
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];

    if (file) {
        imagePreview.src = URL.createObjectURL(file);
    } else {
        imagePreview.src = '/assets/default-player.jpg';
    }
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

async function fetchAndDisplayPlayers() {
    playersDivEl.textContent = '';

    const players = await getPlayers();
    for (let player of players) {
        const playerEl = renderPlayers(player);
        playersDivEl.append(playerEl);
    }
}

async function displayPresets(presets) {
    for (let data of presets) {
        const presetLi = document.createElement('li');
        presetLi.textContent = data.name;
        presetLi.classList.add('preset');
        // const target = renderPresets(data);
        presetLi.addEventListener('click', async () => {
            name.value = data.name;
            ac.value = data.ac;
            init.value = data.init;
            hp.value = data.hp;
        });
        presetList.append(presetLi);
    }
    presetEl.append(presetList);
}

// debug logs
debugButton.addEventListener('click', () => {
    nameInput.value = 'debug';
});
