// renders

import { fetchAndDisplayEnemies, fetchAndDisplayPlayers } from './battle/battle.js';
import {
    decrementEnemyHealth,
    decrementPlayerHealth,
    deleteEnemy,
    deletePlayer,
    getEnemyById,
    getPlayerById,
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

    const hpContainer = document.createElement('li');
    const HP = document.createElement('span');
    HP.setAttribute('id', `HP-${data.id}`);
    const maxHPEl = document.createElement('p');

    const ac = document.createElement('li');
    const init = document.createElement('li');

    const healthDiv = document.createElement('div');
    const increaseBtn = document.createElement('button');
    const value = document.createElement('input');
    value.type = 'number';
    value.placeholder = 'HP Amount';
    const decreaseBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    let maxHP = [];

    maxHP.push(data.hp);
    const displayMaxHP = maxHP[0];
    // populate
    imgDiv.style.backgroundImage = `url('${data.image}')`;
    name.textContent = data.name;
    hpContainer.textContent = 'HP';

    HP.textContent = data.hp;
    maxHPEl.textContent = `/${displayMaxHP}`;
    ac.textContent = `AC: ${data.ac}`;
    init.textContent = `INIT: ${data.init}`;

    increaseBtn.textContent = '+';
    decreaseBtn.textContent = '-';
    removeBtn.textContent = 'Remove Enemy';

    removeBtn.addEventListener('click', async () => {
        await deleteEnemy(data.id);
        await fetchAndDisplayEnemies();
    });

    decreaseBtn.addEventListener('click', async () => {
        enemyDiv.classList.toggle('damage-animation');
        await decrementEnemyHealth(data.id, value.value);
        const hpId = document.getElementById(`HP-${data.id}`);
        const newData = await getEnemyById(data.id);
        hpId.textContent = newData.hp;
        enemyDiv.classList.toggle('damage-animation');
    });

    increaseBtn.addEventListener('click', async () => {
        enemyDiv.classList.toggle('heal-animation');
        await incrementEnemyHealth(data.id, value.value);
        const hpId = document.getElementById(`HP-${data.id}`);
        const newData = await getEnemyById(data.id);
        hpId.textContent = newData.hp;
        enemyDiv.classList.toggle('heal-animation');
    });

    // style
    enemyDiv.classList.add('enemy');
    imgDiv.classList.add('player-img');
    name.classList.add('enemy-name');
    ul.classList.add('stats');
    healthDiv.classList.add('health');
    increaseBtn.classList.add('increase');
    value.classList.add('health-input');
    decreaseBtn.classList.add('decrease');
    removeBtn.classList.add('enemy-remove-button');

    // consolidate
    ul.append(hpContainer, HP, maxHPEl, ac, init);
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

    const hpContainer = document.createElement('li');
    const HP = document.createElement('span');
    HP.setAttribute('id', `HP-${data.id}`);
    const maxHPEl = document.createElement('p');

    const ac = document.createElement('li');
    const init = document.createElement('li');

    const healthDiv = document.createElement('div');
    const increaseBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const value = document.createElement('input');
    value.type = 'number';
    value.placeholder = 'HP Amount';
    const decreaseBtn = document.createElement('button');

    let maxHP = [];

    maxHP.push(data.hp);
    const displayMaxHP = maxHP[0];

    // populate
    imgDiv.style.backgroundImage = `url('${data.image}')`;
    name.textContent = data.name;
    hpContainer.textContent = 'HP';
    HP.textContent = data.hp;
    maxHPEl.textContent = `/${displayMaxHP}`;
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
        playerDiv.classList.toggle('damage-animation');
        await decrementPlayerHealth(data.id, value.value);
        const hpId = document.getElementById(`HP-${data.id}`);
        const newData = await getPlayerById(data.id);
        hpId.textContent = newData.hp;
        playerDiv.classList.toggle('damage-animation');
    });

    increaseBtn.addEventListener('click', async () => {
        playerDiv.classList.toggle('heal-animation');
        await incrementPlayerHealth(data.id, value.value);
        const hpId = document.getElementById(`HP-${data.id}`);
        const newData = await getPlayerById(data.id);
        hpId.textContent = newData.hp;
        playerDiv.classList.toggle('heal-animation');
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
    ul.append(hpContainer, HP, maxHPEl, ac, init);
    healthDiv.append(increaseBtn, value, decreaseBtn);
    playerDiv.append(imgDiv, name, ul, healthDiv, removeBtn);

    return playerDiv;
}
