/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

/* Get DOM Elements */
const playerBtn = document.getElementById('player-button');
const dmBtn = document.getElementById('dm-button');
const abtBtn = document.getElementById('about-btn');

/* State */

/* Events */
playerBtn.addEventListener('click', () => {
    window.location.replace('/player');
});

dmBtn.addEventListener('click', () => {
    window.location.replace('/battle');
});

abtBtn.addEventListener('click', () => {
    window.location.replace('/aboutUs');
});
/* Display Functions */
