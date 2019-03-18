import * as mage from 'mage-sdk-js';

mage.setEndpoint('http://localhost:8080');

enum State {
    Loading,
    Loaded,
    LoggedIn,
}

// This is really dumb but dead simple for this little exercise
function adjustVisibility(state: State) {
    const all = ['loading', 'login', 'game'];
    let toShow: string = '';

    switch (state) {
        case State.Loading:
            toShow = 'loading';
            break;

        case State.Loaded:
            toShow = 'login';
            break;

        case State.LoggedIn:
            toShow = 'game';
            break;
    }

    for (const id of all) {
        const el = document.getElementById(id);

        if (el && el.id !== toShow) {
            el.style.display = 'none';
        }
    }

    const showElement = document.getElementById(toShow);

    if (showElement) {
        showElement.style.display = 'inherit';
    }
}

adjustVisibility(State.Loading);

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

        adjustVisibility(State.LoggedIn);

        const data = await mage.players.getData();

        console.log(data);
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

        adjustVisibility(State.LoggedIn);

        const data = await mage.players.getData();

        console.log(data);
    } catch (err) {
        console.error(err);
    }
};

mage.configure(async (err: Error) => {
    if (err) {
        console.error(err);
        return;
    }

    await mage.setupModule('session', require('mage-sdk-js.session'));

    console.log(mage);
    adjustVisibility(State.Loaded);
});
