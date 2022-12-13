const SUPABASE_URL = 'https://fgfwcgpgwqwvqbgpdmlr.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZndjZ3Bnd3F3dnFiZ3BkbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MzM5OTIsImV4cCI6MTk4NjIwOTk5Mn0.0cOL1g2WEjhIpHM1mIvwvjlmXxgDYF7yrMHX3FQzziU';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

function checkError(response) {
    return response.error ? console.error(response.error) : response.data;
}

/* Data functions */

export async function getEnemyPresets() {
    const response = await client.from('enemy_presets').select();

    return checkError(response);
}

export async function getEnemies() {
    const response = await client.from('enemies').select();

    return checkError(response);
}

export async function getPlayerPresets() {
    const response = await client.from('player_presets').select();

    return checkError(response);
}

export async function getPlayers() {
    const response = await client.from('players').select();

    return checkError(response);
}

export async function createEnemy(enemy) {
    const response = await client.from('enemies').insert(enemy).single();
    return checkError(response);
}

export async function createPlayer(player) {
    const response = await client.from('players').insert(player).single();
    return checkError(response);
}

export async function uploadImage(imagePath, imageFile) {
    const bucket = await client.storage.from('avatars');

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return response.error;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

// console checks
// console.log('enemies_Presets', getEnemyPresets());
// console.log('players', getPlayers());
// console.log('getEnemies()', getEnemies());
