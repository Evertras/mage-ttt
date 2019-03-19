import mage = require('mage');
import { promisify } from 'util';
import { TicTacToe } from '../../game/tictactoe';

interface IGameIndex extends mage.archivist.IArchivistIndex {
    gameId: string;
    playerX: string;
    playerO: string;
}

export async function createGame(state: mage.core.IState, name: string) {
    if (!state.session) {
        throw new Error('No session found');
    }

    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const ttt = new TicTacToe(name);
    const username = state.session.meta.username;

    const listGame = promisify(state.archivist.list.bind(state.archivist, 'game'));

    const alreadyCreated = await listGame({ playerX: username });

    // TODO: config this
    if (alreadyCreated.length >= 5) {
        throw new Error('Player has too many active games');
    }

    const existing = await listGame({ gameId: ttt.getId() });

    if (existing.length) {
        throw new Error('Game with that name already exists');
    }

    state.archivist.set(
        'game',
        <IGameIndex> {
            gameId: ttt.getId(),
            playerX: username,
            playerO: '',
        }, ttt);
}

export async function del(state: mage.core.IState, name: string) {
    if (!state.session) {
        throw new Error('No session found');
    }

    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const find = promisify(state.archivist.list.bind(state.archivist, 'game'));
    const existing = await find({ gameId: name, playerX: state.session.meta.username }) as IGameIndex[];

    if (!existing || existing.length === 0) {
        throw new Error('No game found owned by player');
    }

    mage.logger.debug('Deleting', JSON.stringify(existing[0]));

    state.archivist.del('game', existing[0]);
}

export async function getOpen(state: mage.core.IState) {
    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const listGame = promisify(state.archivist.list.bind(state.archivist, 'game'));

    const existing = await listGame({ playerO: '' }) as IGameIndex[];

    return existing;
}

export async function getActive(state: mage.core.IState) {
    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    if (!state.session) {
        throw new Error('No session found');
    }

    const listGame = promisify(state.archivist.list.bind(state.archivist, 'game'));
    const username = state.session.meta.username;

    const existing = await listGame({ playerX: username }) as IGameIndex[];

    return existing.filter((g) => g.playerO !== '');
}
