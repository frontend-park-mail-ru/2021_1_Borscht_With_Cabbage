import { deleteUser } from '../../modules/auth.js';

export class Logout {
    constructor (root, route) {
        this.route = route;
        this.root = root;
    }

    render () {
        deleteUser();
        const url = window.location.pathname;
        if (/\/user/.test(url) || /\/basket/.test(url)) {
            this.route('main');
        }
    }
}
