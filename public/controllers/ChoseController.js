import { noop } from 'Modules/utils.js';
import { ChoseView } from 'Views/ChoseView.js';
import user from 'Modules/user.js';
import redirect from 'Modules/redirect.js';
import choseModel from 'Models/ChoseModel.js';

export class ChoseController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.view = new ChoseView({ root, goTo, controller: this })
    }

    render (url) {
        if (user.isAuth) {
            if (user.role === 'admin') {
                redirect.push(url); // TODO overthink and check
                this.goTo('login');
            }
        } else {
            // TODO брать данные из basket и/или localStorage
        }

        if (/comparison/.test(url)) {
            this.activePage = 'comparison';
            this.getBaskets();
        } else if (/all/.test(url)) {
            this.activePage = 'all';
            this.getBaskets();
        } else {
            this.goTo('/chose/all');
        }
    }

    getBaskets () {

    }

    draw (baskets) {

    }

    deleteBasket (id) {
        choseModel.deleteBasket(id);
    }

    orderBasket (id) {
        this.goTo(`/basket/${id}`);
    }

    goStore (id) {
        this.goTo(`/store/${id}`);
    }
}
