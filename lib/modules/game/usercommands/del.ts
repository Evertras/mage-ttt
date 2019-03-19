import mage = require('mage');
import { del } from '..';

export const acl = ['user'];

export async function execute(state: mage.core.IState, name: string) {
    await del(state, name);
}
