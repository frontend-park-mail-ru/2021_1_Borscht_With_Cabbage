import { logoutGet } from 'Modules/api.js';
import { noop } from 'Modules/utils.js';
import eventBus from 'Modules/eventBus.js';
import { AuthEvents } from 'Events/AuthEvents.js';

export class Logout {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.render = this.render.bind(this);
    }

    render () {
        eventBus.emit(AuthEvents.userLogout, {});

        logoutGet()
            .then(_ => this.goTo('main'))
            .catch(r => console.log(`error /logout ${r}`));
    }
}
