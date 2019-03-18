export enum Player {
    None,
    X,
    O,
}

export enum Result {
    Unfinished,
    Draw,
    X,
    O,
}

export class TicTacToe {
    private squares: Player[][];
    private turn: Player = Player.X;
    private turnCount: number = 1;

    constructor() {
        this.squares = [
            [Player.None, Player.None, Player.None],
            [Player.None, Player.None, Player.None],
            [Player.None, Player.None, Player.None],
        ];
    }

    public getTurn(): Player {
        return this.turn;
    }

    public getSquares(): Player[][] {
        return this.squares;
    }

    public move(x: number, y: number) {
        if (x < 0 || x > 2 || y < 0 || y > 2) {
            throw new Error('Move coordinates out of bounds');
        }

        if (this.squares[x][y] !== Player.None) {
            throw new Error('Square already filled');
        }

        this.squares[x][y] = this.turn;

        if (this.turn === Player.X) {
            this.turn = Player.O;
        } else {
            this.turn = Player.X;
        }

        ++this.turnCount;
    }

    public getResult(): Result {
        // Check verticals
        for (let x = 0; x < 3; ++x) {
            const p = this.squares[x][0];

            if (p === Player.None) {
                continue;
            }

            if (this.squares[x][1] === p && this.squares[x][2] === p) {
                return this.playerToResult(p);
            }
        }

        // Check horizontals
        for (let y = 0; y < 3; ++y) {
            const p = this.squares[0][y];

            if (p === Player.None) {
                continue;
            }

            if (this.squares[1][y] === p && this.squares[2][y] === p) {
                return this.playerToResult(p);
            }
        }

        // Check diagonals
        const middle = this.squares[1][1];

        // We don't care about turn count below if there are spaces left
        if (middle === Player.None) {
            return Result.Unfinished;
        }

        if (this.squares[0][0] === middle && this.squares[2][2] === middle) {
            return this.playerToResult(middle);
        }

        if (this.squares[0][2] === middle && this.squares[2][0] === middle) {
            return this.playerToResult(middle);
        }

        if (this.turnCount > 9) {
            return Result.Draw;
        }

        return Result.Unfinished;
    }

    private playerToResult(p: Player): Result {
        switch (p) {
            case Player.X:
                return Result.X;

            case Player.O:
                return Result.O;
        }

        throw new Error('Cannot have a result from None');
    }
}
