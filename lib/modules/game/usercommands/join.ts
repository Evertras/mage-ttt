import mage = require('mage');
import { join } from '..';

export const acl = ['user'];

export async function execute(state: mage.core.IState, name: string) {
    return join(state, name);
}
