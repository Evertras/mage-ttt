import mage = require('mage');
import { createGame } from '..';

export const acl = ['user'];

export async function execute(state: mage.core.IState, name: string) {
    await createGame(state, name);
}
