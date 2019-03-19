import * as mage from 'mage-sdk-js';
import { playerMeta } from './playerData';
import { adjustVisibility, State } from './states';

async function loggedIn(username: string) {
    playerMeta.username = username;

    const mdUsername = document.getElementById('mdusername') as HTMLElement;

    mdUsername.textContent = 'Logged in as: ' + username;

    await adjustVisibility(State.LoggedIn);
}

export function setupLoginButtons() {
    const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;

    registerButton.onclick = async () => {
        try {
            const usernameInput = document.getElementById('registerUser') as HTMLInputElement;
            const passwordInput = document.getElementById('registerPassword') as HTMLInputElement;

            if (!usernameInput || !passwordInput) {
                console.error('Missing registerUser or registerPassword');
                return;
            }

            await mage.players.register(usernameInput.value, passwordInput.value);

            await loggedIn(usernameInput.value);
        } catch (err) {
            console.error(err);
        }
    };

    loginButton.onclick = async () => {
        try {
            const usernameInput = document.getElementById('user') as HTMLInputElement;
            const passwordInput = document.getElementById('password') as HTMLInputElement;

            if (!usernameInput || !passwordInput) {
                console.error('Missing user or password');
                return;
            }

            await mage.players.login(usernameInput.value, passwordInput.value);

            await loggedIn(usernameInput.value);
        } catch (err) {
            console.error(err);
        }
    };
}
