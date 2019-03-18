import * as chai from 'chai';
import { Player, TicTacToe } from './tictactoe';

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
    });
});
