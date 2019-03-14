import * as mage from 'mage';
import { register } from '../';

exports.acl = ['*'];

exports.execute = function(state: mage.core.IState, username: string, password: string, callback: any) {
    register(state, username, password, (error: any, userId: any) => {
        if (error) {
            return state.error(error.code, error, callback);
        }

        state.respond(userId);

        callback();
    });
}
