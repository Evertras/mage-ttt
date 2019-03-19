import * as mage from 'mage-sdk-js';
import { setupLoginButtons } from './login';
import { setupSearchButtons } from './search';
import { adjustVisibility, State } from './states';

mage.setEndpoint('http://localhost:8080');

window.onload = async () => {
    await adjustVisibility(State.Loading);

    setupLoginButtons();
    setupSearchButtons();

    mage.configure(async (err: Error) => {
        if (err) {
            console.error(err);
            return;
        }

        console.debug(mage);

        mage.eventManager.on('game.join', (_: any, data: any) => {
            console.log('Joined!', data.name);
        });

        await mage.setupModule('session', require('mage-sdk-js.session'));

        await adjustVisibility(State.Loaded);
    });
};
