import * as mage from 'mage-sdk-js';
import { playerMeta } from './playerData';

export function setupSearchButtons() {
    const createButton = document.getElementById('createGameButton') as HTMLButtonElement;

    createButton.onclick = async () => {
        await mage.game.create();
        await updateOpenGames();
    };
}

export async function updateOpenGames() {
    const open = await mage.game.getOpen();
    const active = await mage.game.getActive();
    const ulMine = document.getElementById('opengamesmine') as HTMLUListElement;
    const ulOthers = document.getElementById('opengamesothers') as HTMLUListElement;
    const ulActive = document.getElementById('activegames') as HTMLUListElement;

    ulMine.innerHTML = '';
    ulOthers.innerHTML = '';
    ulActive.innerHTML = '';

    const mine = open.filter((g) => g.playerX === playerMeta.username);
    const others = open.filter((g) => g.playerX !== playerMeta.username);

    for (const g of mine) {
        const item = document.createElement('li');
        const button = document.createElement('button') as HTMLButtonElement;
        const text = document.createElement('span') as HTMLSpanElement;

        function genClick(name: string): () => void {
            return async () => {
                await mage.game.del(name);
                await updateOpenGames();
            };
        }

        button.onclick = genClick(g.gameId);
        button.textContent = 'Delete';

        item.appendChild(button);

        text.textContent = g.gameId;

        item.appendChild(text);

        ulMine.appendChild(item);
    }

    for (const g of others) {
        const item = document.createElement('li');
        const button = document.createElement('button') as HTMLButtonElement;
        const text = document.createElement('span') as HTMLSpanElement;

        function genClick(name: string): () => void {
            return () => {
                console.log('Joining ' + name);
            };
        }

        button.onclick = genClick(g.gameId);
        button.textContent = 'Join';

        item.appendChild(button);

        text.textContent = g.gameId + ' (created by ' + g.playerX + ')';

        item.appendChild(text);

        ulOthers.appendChild(item);
    }

    for (const g of active) {
        const item = document.createElement('li');
        const button = document.createElement('button') as HTMLButtonElement;
        const text = document.createElement('span') as HTMLSpanElement;

        function genClick(name: string): () => void {
            return () => {
                console.log('Playing ' + name);
            };
        }

        button.onclick = genClick(g.gameId);
        button.textContent = 'Play';

        item.appendChild(button);

        text.textContent = g.gameId;

        item.appendChild(text);

        ulActive.appendChild(item);
    }
}
