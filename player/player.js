// Import
import { createPlayerPreset, getUser, uploadImage } from '../fetch-utils.js';


// DOM
const form = document.getElementById('create-form');
const avatarPreview = document.getElementById('image-preview');
const feedbackText = document.getElementById('feedback');
const imageInput = document.getElementById('image-input');


// State



// Events
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = await getUser();
    const data = new FormData(form);
    const playerObject = {
        name: data.get('name'),
        ac: data.get('armor'),
        init: data.get('init'),
        hp: data.get('hp'),
        owner: user.id,
        STR: data.get('str'),
        DEX: data.get('dex'),
        CON: data.get('con'),
        INT: data.get('int'),
        WIS: data.get('wis'),
        CHA: data.get('cha')
    };
    const imageFile = data.get('image');
    if (imageFile && imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imagePath, imageFile);

        playerObject.image = url;
    }

    await createPlayerPreset(playerObject);
    feedbackText.textContent = 'Player Successfully Submitted!';
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];

    if (file) {
        avatarPreview.src = URL.createObjectURL(file);
    } else {
        avatarPreview.src = '/assets/default-player.jpg';
    }
});

// Display


// debug logs