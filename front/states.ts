import { updateOpenGames } from './search';

export enum State {
    Loading,
    Loaded,
    LoggedIn,
    Playing,
}

// This is really dumb but dead simple for this little exercise
export async function adjustVisibility(state: State) {
    const all = ['loading', 'login', 'search', 'game'];
    let toShow: string = '';

    switch (state) {
        case State.Loading:
            toShow = 'loading';
            break;

        case State.Loaded:
            toShow = 'login';
            break;

        case State.LoggedIn:
            toShow = 'search';
            await updateOpenGames();
            break;

        case State.Playing:
            toShow = 'game';
            break;
    }

    for (const id of all) {
        const el = document.getElementById(id);

        if (el && el.id !== toShow) {
            el.style.display = 'none';
        }
    }

    const showElement = document.getElementById(toShow);

    if (showElement) {
        showElement.style.display = 'inherit';
    }
}
