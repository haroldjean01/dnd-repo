// renders

import { fetchAndDisplayEnemies, fetchAndDisplayPlayers } from './battle/battle.js';
import {
    decrementEnemyHealth,
    decrementPlayerHealth,
    deleteEnemy,
    deletePlayer,
    incrementEnemyHealth,
    incrementPlayerHealth,
} from './fetch-utils.js';

export function renderPresets(data) {
    // create
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    // populate
    li.textContent = data.name;

    // style
    ul.classList.add('preset-ul');
    li.classList.add('preset');

    //consolidate
    ul.append(li);

    return ul;
}

export function renderEnemies(data) {
    // create
    const enemyDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const name = document.createElement('h3');
    const ul = document.createElement('ul');
    const hp = document.createElement('li');
    const ac = document.createElement('li');
    const init = document.createElement('li');

    const healthDiv = document.createElement('div');
    const increaseBtn = document.createElement('button');
    const value = document.createElement('input');
    value.type = 'number';
    value.placeholder = 'HP Amount';
    const decreaseBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    // populate
    imgDiv.style.backgroundImage = `url('${data.image}')`;
    name.textContent = data.name;
    hp.textContent = `HP: ${data.hp}`;
    ac.textContent = `AC: ${data.ac}`;
    init.textContent = `INIT: ${data.init}`;

    increaseBtn.textContent = '+';
    decreaseBtn.textContent = '-';
    removeBtn.textContent = 'Remove Enemy';

    decreaseBtn.addEventListener('click', async () => {
        await decrementEnemyHealth(data.id, value.value);
        await fetchAndDisplayEnemies();
    });

    increaseBtn.addEventListener('click', async () => {
        await incrementEnemyHealth(data.id, value.value);
        await fetchAndDisplayEnemies();
    });

    removeBtn.addEventListener('click', async () => {
        await deleteEnemy(data.id);
        console.log('data.id', data.id);
        await fetchAndDisplayEnemies();
    });

    // style
    enemyDiv.classList.add('enemy');
    imgDiv.classList.add('enemy-img');
    name.classList.add('enemy-name');
    ul.classList.add('stats');
    healthDiv.classList.add('health');
    increaseBtn.classList.add('increase');
    value.classList.add('health-input');
    decreaseBtn.classList.add('decrease');
    removeBtn.classList.add('remove-button');

    // consolidate
    ul.append(hp, ac, init);
    healthDiv.append(increaseBtn, value, decreaseBtn);
    enemyDiv.append(removeBtn, healthDiv, ul, name, imgDiv);

    return enemyDiv;
}

export function renderPlayers(data) {
    // create
    const playerDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const name = document.createElement('h3');
    const ul = document.createElement('ul');
    const hp = document.createElement('li');
    const ac = document.createElement('li');
    const init = document.createElement('li');

    const healthDiv = document.createElement('div');
    const increaseBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const value = document.createElement('input');
    value.type = 'number';
    value.placeholder = 'HP Amount';
    const decreaseBtn = document.createElement('button');

    // populate
    imgDiv.style.backgroundImage = `url('${data.image}')`;
    name.textContent = data.name;
    hp.textContent = `HP: ${data.hp}`;
    ac.textContent = `AC: ${data.ac}`;
    init.textContent = `INIT: ${data.init}`;

    increaseBtn.textContent = '+';
    decreaseBtn.textContent = '-';
    removeBtn.textContent = 'Remove Player';

    removeBtn.addEventListener('click', async () => {
        await deletePlayer(data.id);
        await fetchAndDisplayPlayers();
    });

    decreaseBtn.addEventListener('click', async () => {
        await decrementPlayerHealth(data.id, value.value);
        await fetchAndDisplayPlayers();
    });

    increaseBtn.addEventListener('click', async () => {
        await incrementPlayerHealth(data.id, value.value);
        await fetchAndDisplayPlayers();
    });

    // style
    playerDiv.classList.add('player');
    imgDiv.classList.add('player-img');
    name.classList.add('player-name');
    ul.classList.add('stats');
    healthDiv.classList.add('health');
    increaseBtn.classList.add('increase');
    value.classList.add('health-input');
    decreaseBtn.classList.add('decrease');
    removeBtn.classList.add('remove-button');

    // consolidate
    ul.append(hp, ac, init);
    healthDiv.append(increaseBtn, value, decreaseBtn);
    playerDiv.append(imgDiv, name, ul, healthDiv, removeBtn);

    return playerDiv;
}
