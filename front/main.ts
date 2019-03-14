import * as mage from 'mage-sdk-js';

mage.setEndpoint('http://localhost:8080');

// This is dumb but dead simple
function hideWhileLoading() {
    const toHide = document.getElementsByClassName('loaded');
    for (const el of toHide) {
        (<HTMLElement> el).style.display = 'none';
    }

    const toShow = document.getElementsByClassName('loading');
    for (const el of toShow) {
        (<HTMLElement> el).style.display = 'inherit';
    }
}

function showAfterLoaded() {
    const toHide = document.getElementsByClassName('loading');
    for (const el of toHide) {
        (<HTMLElement> el).style.display = 'none';
    }

    const toShow = document.getElementsByClassName('loaded');
    for (const el of toShow) {
        (<HTMLElement> el).style.display = 'inherit';
    }
}

hideWhileLoading();

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
    showAfterLoaded();
});
