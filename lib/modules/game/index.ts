import mage = require('mage');
import { promisify } from 'util';
import { TicTacToe } from '../../game/tictactoe';

interface IGameIndex extends mage.archivist.IArchivistIndex {
    gameId: string;
    playerX: string;
    playerO: string;
}

export async function create(state: mage.core.IState, name: string) {
    if (!state.session) {
        throw new Error('No session found');
    }

    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const ttt = new TicTacToe(name);

    const scanGame = promisify(state.archivist.scan.bind(state.archivist, 'game'));

    const existing = await scanGame({ gameId: ttt.getId() });

    if (existing.length) {
        throw new Error('Game with that name already exists');
    }

    state.archivist.set(
        'game',
        <IGameIndex> {
            gameId: ttt.getId(),
            playerX: state.session.meta.username,
            playerO: '',
        }, ttt);
}

export async function getOpen(state: mage.core.IState) {
    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const listGame = promisify(state.archivist.list.bind(state.archivist, 'game'));

    const existing = await listGame({ playerO: '' }) as IGameIndex[];

    return existing;
}
