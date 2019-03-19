import mage = require('mage');
import { promisify } from 'util';
import { TicTacToe } from '../../game/tictactoe';

const gameTopic = 'game';
const playerNone = '<@@NONE@@#>';

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
    const listGame = promisify(state.archivist.list.bind(state.archivist, gameTopic));

    const alreadyCreated = await listGame({ playerX: state.actorId });

    // TODO: config this
    if (alreadyCreated.length >= 5) {
        throw new Error('Player has too many active games');
    }

    const existing = await listGame({ gameId: ttt.getId() });

    if (existing.length) {
        throw new Error('Game with that name already exists');
    }

    state.archivist.set(
        gameTopic,
        <IGameIndex> {
            gameId: ttt.getId(),
            playerX: state.actorId,
            playerO: playerNone,
        }, ttt);
}

export async function del(state: mage.core.IState, name: string) {
    if (!state.session) {
        throw new Error('No session found');
    }

    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const find = promisify(state.archivist.list.bind(state.archivist, gameTopic));
    const existing = await find({ gameId: name, playerX: state.actorId }) as IGameIndex[];

    if (!existing || existing.length === 0) {
        throw new Error('No game found owned by player');
    }

    mage.logger.debug('Deleting', JSON.stringify(existing[0]));

    state.archivist.del(gameTopic, existing[0]);
}

export async function getOpen(state: mage.core.IState) {
    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    const listGame = promisify(state.archivist.list.bind(state.archivist, gameTopic));

    const existing = await listGame({ playerO: playerNone }) as IGameIndex[];

    return existing;
}

export async function getActive(state: mage.core.IState) {
    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    if (!state.session) {
        throw new Error('No session found');
    }

    const listGame = promisify(state.archivist.list.bind(state.archivist, gameTopic));

    const existingX = await listGame({ playerX: state.actorId }) as IGameIndex[];
    const existingO = await listGame({ playerO: state.actorId }) as IGameIndex[];

    return existingX.filter((g) => g.playerO !== playerNone)
                    .concat(existingO);
}

export async function join(state: mage.core.IState, name: string) {
    if (!state.archivist) {
        throw new Error('No archivist found');
    }

    if (!state.session) {
        throw new Error('No session found');
    }

    if (!state.actorId) {
        throw new Error('No actorId found');
    }

    const scanGame = promisify(state.archivist.scan.bind(state.archivist, gameTopic));

    const scanned = await scanGame({ gameId: name });

    if (!scanned || scanned.length === 0) {
        throw new Error('Game not found');
    }

    const gameIndex = scanned[0][0];
    const gameData = scanned[0][1];

    state.archivist.set(
        gameTopic,
        <IGameIndex> { gameId: name, playerX: gameIndex.playerX, playerO: state.actorId },
        gameData);

    state.archivist.del(gameTopic, gameIndex);

    mage.logger.debug(gameIndex.gameId, gameIndex.playerX, gameIndex.playerO);

    state.emit([gameIndex.playerX, state.actorId], 'game.join', {
        name,
    });
}
