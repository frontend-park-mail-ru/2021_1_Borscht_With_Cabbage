import { logoutGet } from '../modules/api.js';
import { noOp } from '../modules/utils.js';
import eventBus from '../modules/eventBus.js';
import AuthEvents from '../events/AuthEvents.js';

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
        eventBus.emit(AuthEvents.userLogout, {})

        logoutGet()
            .then(_ => this.goTo('main'))
            .catch(r => console.log(`error /logout ${r}`))
    }
}
