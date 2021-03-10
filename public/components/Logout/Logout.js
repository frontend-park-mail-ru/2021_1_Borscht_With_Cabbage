import { deleteUser } from '../../modules/auth.js';
import { logoutGet } from '../../modules/api.js';

export class Logout {
    constructor (root, route) {
        this.route = route;
        this.root = root;
        this.render = this.render.bind(this);
    }

    render () {
        deleteUser();

        logoutGet()
            .then(_ => this.route('main'))
            .catch(r => console.log(`error /logout ${r}`))
    }
}
