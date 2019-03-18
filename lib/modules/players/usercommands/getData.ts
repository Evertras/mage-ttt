import * as mage from 'mage';
import { getData } from '../';

export const acl = ['*'];

export async function execute(state: mage.core.IState) {
    if (!state.data) {
        throw new Error('No data member found on state');
    }

    if (!state.session) {
        throw new Error('No session found');
    }

    return await getData(state, state.session.meta.username);
}
