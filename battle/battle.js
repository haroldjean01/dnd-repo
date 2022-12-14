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
    getPlayerById,
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
const hideToggleButton = document.getElementById('hide-toggle');
const diceSelect = document.getElementById('dice-type');
const diceRollButton = document.getElementById('dice-roll');
const diceResult = document.getElementById('dice-result');

// form Elements
const imageInput = document.querySelector('[name=image]');
const formName = document.querySelector('[name=name]');
const formAc = document.querySelector('[name=armor]');
const formInit = document.querySelector('[name=init]');
const formHp = document.querySelector('[name=hp]');
const formImagePreset = document.getElementById('preset-image');
const formSTR = document.querySelector('[name=str]');
const formDEX = document.querySelector('[name=dex]');
const formCON = document.querySelector('[name=con]');
const formINT = document.querySelector('[name=int]');
const formWIS = document.querySelector('[name=wis]');
const formCHA = document.querySelector('[name=cha]');

const formLabelstr = document.getElementById('str-label');
const formLabeldex = document.getElementById('dex-label');
const formLabelcon = document.getElementById('con-label');
const formLabelint = document.getElementById('int-label');
const formLabelwis = document.getElementById('wis-label');
const formLabelcha = document.getElementById('cha-label');

// States

// Events
hideToggleButton.addEventListener('click', () => {
    formSTR.classList.toggle('hidden');
    formDEX.classList.toggle('hidden');
    formCON.classList.toggle('hidden');
    formINT.classList.toggle('hidden');
    formWIS.classList.toggle('hidden');
    formCHA.classList.toggle('hidden');
    formLabelstr.classList.toggle('hidden');
    formLabeldex.classList.toggle('hidden');
    formLabelcon.classList.toggle('hidden');
    formLabelint.classList.toggle('hidden');
    formLabelwis.classList.toggle('hidden');
    formLabelcha.classList.toggle('hidden');
});

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
    if (imageFile && imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imagePath, imageFile);

        enemyObject.image = url;
    } else if (formImagePreset.value === '') {
        enemyObject.image = '/assets/5e.png';
    } else {
        enemyObject.image = formImagePreset.value;
    }

    imagePreview.src = '/assets/5e.png';

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
        STR: data.get('str'),
        DEX: data.get('dex'),
        CON: data.get('con'),
        INT: data.get('int'),
        WIS: data.get('wis'),
        CHA: data.get('cha'),
    };
    const imageFile = data.get('image');
    if (imageFile && imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imagePath, imageFile);

        playerObject.image = url;
    } else if (formImagePreset.value === '') {
        playerObject.image = '/assets/5e.png';
    } else {
        playerObject.image = formImagePreset.value;
    }

    imagePreview.src = '/assets/5e.png';

    await createPlayer(playerObject);
    fetchAndDisplayPlayers();
    formEl.reset();
});

self.addEventListener('load', async () => {
    await getPlayerById();
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
        imagePreview.src = '/assets/5e.png';
    }
});

diceSelect.addEventListener('change', () => {
    diceRollButton.textContent = `D${diceSelect.value}`;
});

diceRollButton.addEventListener('click', () => {
    diceResult.textContent = 'You rolled: ' + Math.floor(Math.random() * diceSelect.value + 1);
});

// Display

export async function fetchAndDisplayEnemies() {
    enemiesDivEl.textContent = '';

    const enemies = await getEnemies();
    for (let enemy of enemies) {
        const enemyEl = renderEnemies(enemy);
        enemiesDivEl.append(enemyEl);
    }
}

export async function fetchAndDisplayPlayers() {
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
            formImagePreset.value = data.image;
            imagePreview.src = formImagePreset.value;
            formName.value = data.name;
            formAc.value = data.ac;
            formInit.value = data.init;
            formHp.value = data.hp;
            formSTR.value = data.STR;
            formDEX.value = data.DEX;
            formCON.value = data.CON;
            formINT.value = data.INT;
            formWIS.value = data.WIS;
            formCHA.value = data.CHA;
        });
        presetList.append(presetLi);
    }
    presetEl.append(presetList);
}

// debug logs
