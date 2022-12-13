// renders

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
    const decreaseBtn = document.createElement('button');

    // populate
    imgDiv.style.backgroundImage = `url('${data.image}')`;
    name.textContent = data.name;
    hp.textContent = `HP: ${data.hp}`;
    ac.textContent = `AC: ${data.ac}`;
    init.textContent = `INIT: ${data.init}`;

    increaseBtn.textContent = '+';
    decreaseBtn.textContent = '-';


    // style
    enemyDiv.classList.add('enemy');
    imgDiv.classList.add('enemy-img');
    name.classList.add('enemy-name');
    ul.classList.add('stats');
    healthDiv.classList.add('enemy-health');
    increaseBtn.classList.add('increase-enemy');
    value.classList.add('enemy-input');
    decreaseBtn.classList.add('decrease-enemy');


    // consolidate
    ul.append(hp, ac, init);
    healthDiv.append(increaseBtn, value, decreaseBtn);
    enemyDiv.append(imgDiv, name, ul, healthDiv);

    return enemyDiv;
}