import mage = require('mage');
import { getOpen } from '..';

export const acl = ['user'];

export async function execute(state: mage.core.IState) {
    return await getOpen(state);
}
