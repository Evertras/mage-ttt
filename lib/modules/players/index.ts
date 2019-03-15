import * as mage from 'mage';
import { promisify } from 'util';

export async function register(state: mage.core.IState, username: string, password: string) {
    const options: mage.auth.IAuthOptions = {
        acl: ['user'],
    };

    const r = promisify(mage.auth.register);

    const id = await r(state, username, password, options);

    mage.logger.debug('User ID created: ', id);

    await promisify(mage.auth.login)(state, username, password);

    mage.logger.debug('Logged in!');
}

export async function login(state: mage.core.IState, username: string, password: string) {
    const l = promisify(mage.auth.login);

    await l(state, username, password);

    mage.logger.debug('Logged in!');
}

// tslint:disable-next-line: variable-name
export function setup(_state: mage.core.IState, callback: any) {
    mage.logger.info('Starting up the players module');

    callback();
}
