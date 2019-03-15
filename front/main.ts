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
