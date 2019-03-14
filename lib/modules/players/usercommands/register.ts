import * as mage from 'mage';
import { register } from '../';

export const acl = ['*'];

export async function execute(state: mage.core.IState, username: string, password: string) {
    return register(state, username, password);
}
