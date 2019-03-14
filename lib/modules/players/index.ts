import * as mage from 'mage';

export function register (state: mage.core.IState, username: string, password: string, callback: any) {
    const options: mage.auth.IAuthOptions = {
        acl: ['user'],
    };

    mage.auth.register(state, username, password, options, callback);
};

export function setup(_state: mage.core.IState, callback: any) {
    mage.logger.info('Starting up the players module');

    callback();
}
