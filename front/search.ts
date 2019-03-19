import * as mage from 'mage-sdk-js';

export function setupSearchButtons() {
    const createButton = document.getElementById('createGameButton') as HTMLButtonElement;

    createButton.onclick = async () => {
        await mage.game.create();
        await updateOpenGames();
    };
}

export async function updateOpenGames() {
    const open = await mage.game.getOpen();
    const ul = document.getElementById('opengames') as HTMLUListElement;
    ul.innerHTML = '';

    let list = '';

    for (const g of open) {
        list += '<li>' + g.gameId + ' (' + g.playerX + ')</li>';
    }

    ul.innerHTML = list;
}
