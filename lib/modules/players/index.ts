import * as mage from 'mage';
import { promisify } from 'util';
import { IPlayerData } from './playerData';

export async function register(state: mage.core.IState, username: string, password: string) {
    const options: mage.auth.IAuthOptions = {
        acl: ['user'],
    };

    const r = promisify(mage.auth.register);

    const id = await r(state, username, password, options);

    state.archivist.set('player', { username }, <IPlayerData> {
        Wins: 0,
        Losses: 0,
    });

    mage.logger.debug('User ID created: ', id);

    await login(state, username, password);

    mage.logger.debug('Logged in!');
}

export async function login(state: mage.core.IState, username: string, password: string) {
    const l = promisify(mage.auth.login);

    await l(state, username, password);

    if (!state.session) {
        throw new Error('No session on state');
    }

    state.session.meta.username = username;

    mage.logger.debug('Logged in!');
}

// tslint:disable-next-line: variable-name
export function setup(_state: mage.core.IState, callback: any) {
    mage.logger.info('Starting up the players module');

    callback();
}

export async function getData(state: mage.core.IState, username: string) {
    const get = promisify(state.archivist.get.bind(state.archivist));

    mage.logger.debug('Getting data for:', username);

    return await get('player', { username });
}
