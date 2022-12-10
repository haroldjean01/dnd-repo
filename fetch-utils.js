const SUPABASE_URL = 'https://fgfwcgpgwqwvqbgpdmlr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZndjZ3Bnd3F3dnFiZ3BkbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MzM5OTIsImV4cCI6MTk4NjIwOTk5Mn0.0cOL1g2WEjhIpHM1mIvwvjlmXxgDYF7yrMHX3FQzziU';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
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

/* Data functions */
