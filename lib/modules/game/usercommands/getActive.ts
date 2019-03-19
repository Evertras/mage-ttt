import mage = require('mage');
import { getActive } from '..';

export const acl = ['user'];

export async function execute(state: mage.core.IState) {
    return await getActive(state);
}
