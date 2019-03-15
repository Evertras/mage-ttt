import * as mage from 'mage';
import { login } from '../';

export const acl = ['*'];

export async function execute(state: mage.core.IState, username: string, password: string) {
    return login(state, username, password);
}
