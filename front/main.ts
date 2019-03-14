import * as mage from 'mage-sdk-js';

mage.setEndpoint('http://localhost:8080');

enum State {
    Loading,
    Loaded,
    LoggedIn,
}

// This is really dumb but dead simple for this little exercise
function adjustVisibility(state: State) {
    let toHide: string[] = [];
    let toShow: string[] = [];

    console.log(state);

    switch (state) {
        case State.Loading:
            toHide = ['login', 'game'];
            toShow = ['loading'];
            break;

        case State.Loaded:
            toHide = ['loading', 'game'];
            toShow = ['login'];
            break;

        case State.LoggedIn:
            toHide = ['loading', 'login'];
            toShow = ['game'];
            break;
    }

    for (const id of toHide) {
        const el = document.getElementById(id);

        if (el) {
            el.style.display = 'none';
        }
    }

    for (const id of toShow) {
        const el = document.getElementById(id);

        if (el) {
            el.style.display = 'inherit';
        }
    }
}

adjustVisibility(State.Loading);

const registerButton = document.getElementById('registerButton') as HTMLButtonElement;

registerButton.onclick = () => {
    console.log('clicked');
};

mage.configure(async (err: Error) => {
    if (err) {
        console.error(err);
        return;
    }

    await mage.setupModule('session', require('mage-sdk-js.session'));

    try {
        await mage.players.register('test2', 'testpass');
    } catch (err) {
        console.error(err);
    }

    console.log(mage);
    adjustVisibility(State.Loaded);
});
