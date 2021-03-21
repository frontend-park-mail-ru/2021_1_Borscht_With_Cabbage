import { deleteUser } from '../modules/auth.js';
import { logoutGet } from '../modules/api.js';
import { noOp } from '../modules/utils.js';

export class Logout {
    constructor ({
        root = document.body,
        goTo = noOp
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.render = this.render.bind(this);
    }

    render () {
        deleteUser();

        logoutGet()
            .then(_ => this.goTo('main'))
            .catch(r => console.log(`error /logout ${r}`))
    }
}
