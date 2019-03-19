import mage = require('mage');
import { create } from '..';

export const acl = ['user'];

export async function execute(state: mage.core.IState, name: string) {
    await create(state, name);
}
