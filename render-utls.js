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