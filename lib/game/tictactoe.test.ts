import * as chai from 'chai';
import { Player, Result, TicTacToe } from './tictactoe';

const expect = chai.expect;

describe('TicTacToe', () => {
    it('has X go first', () => {
        const ttt = new TicTacToe();

        expect(ttt.getTurn()).to.equal(Player.X);
    });

    describe('move()', () => {
        it('fills in an empty square', () => {
            const ttt = new TicTacToe();

            expect(ttt.getSquares()[0][0]).to.equal(Player.None);

            ttt.move(0, 0);

            expect(ttt.getSquares()[0][0]).to.equal(Player.X);
        });

        it('errors when trying to move to a filled square', () => {
            const ttt = new TicTacToe();

            ttt.move(0, 0);

            expect(() => {
                ttt.move(0, 0);
            }).to.throw();

            expect(ttt.getSquares()[0][0]).to.equal(Player.X);
        });

        it('changes the turn after moving', () => {
            const ttt = new TicTacToe();

            ttt.move(0, 0);
            expect(ttt.getTurn()).to.equal(Player.O);

            ttt.move(1, 1);
            expect(ttt.getTurn()).to.equal(Player.X);

            expect(ttt.getSquares()[0][0]).to.equal(Player.X);
            expect(ttt.getSquares()[1][1]).to.equal(Player.O);
        });
    });

    describe('getResult()', () => {
        it('starts unfinished', () => {
            const ttt = new TicTacToe();

            expect(ttt.getResult()).to.equal(Result.Unfinished);
        });

        it('finds horizontal wins', () => {
            for (let y = 0; y < 3; ++y) {
                const ttt = new TicTacToe();

                const squares = ttt.getSquares();

                squares[0][y] = squares[1][y] = squares[2][y] = Player.X;

                expect(ttt.getResult()).to.equal(Result.X);
            }
        });

        it('finds vertical wins', () => {
            for (let x = 0; x < 3; ++x) {
                const ttt = new TicTacToe();

                const squares = ttt.getSquares();

                squares[0][x] = squares[1][x] = squares[2][x] = Player.X;

                expect(ttt.getResult()).to.equal(Result.X);
            }

            // Make sure they all have to match
            for (let x = 0; x < 3; ++x) {
                const ttt = new TicTacToe();

                const squares = ttt.getSquares();

                squares[0][x] = squares[2][x] = Player.X;
                squares[1][x] = Player.O;

                expect(ttt.getResult()).to.equal(Result.Unfinished);
            }
        });

        it('finds diagonal down wins', () => {
            const ttt = new TicTacToe();

            const squares = ttt.getSquares();

            squares[0][0] = Player.O;
            squares[1][1] = Player.O;
            squares[2][2] = Player.O;

            expect(ttt.getResult()).to.equal(Result.O);
        });

        it('finds diagonal up wins', () => {
            const ttt = new TicTacToe();

            const squares = ttt.getSquares();

            squares[0][2] = Player.O;
            squares[1][1] = Player.O;
            squares[2][0] = Player.O;

            expect(ttt.getResult()).to.equal(Result.O);
        });

        it('draws when the board is full', () => {
            const ttt = new TicTacToe();

            // X | O | X
            // X | X | O
            // O | X | O

            // The worst game of Tic Tac Toe to ever be played
            ttt.move(0, 0); // X
            ttt.move(1, 0); // O
            ttt.move(2, 0); // X
            ttt.move(2, 1); // O
            ttt.move(0, 1); // X
            ttt.move(2, 2); // O
            ttt.move(1, 1); // X
            ttt.move(0, 2); // O
            ttt.move(1, 2); // X

            expect(ttt.getResult()).to.equal(Result.Draw);
        });
    });
});
