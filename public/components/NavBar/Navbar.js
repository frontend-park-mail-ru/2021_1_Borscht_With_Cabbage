import { renderAuthBlock, renderNotAuthBlock } from './NavbarTmpl.js';
import { renderTopNavRestaurantView, renderTopNavUserView } from './NavbarTmpl.js';

import { noop } from '../../modules/utils.js';
import user from '../../modules/user.js';
import restaurant from '../../modules/restaurant.js';
import eventBus from '../../modules/eventBus.js';
import { AuthEvents } from '../../events/AuthEvents.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        eventBus.on(AuthEvents.userSignIn, this.renderUserAuth.bind(this));
        eventBus.on(AuthEvents.userLogout, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.restaurantSignIn, this.renderRestaurantAuth.bind(this));
        eventBus.on(AuthEvents.restaurantLogout, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.notAuth, this.renderNotAuth.bind(this));
    }

    render () {
    }

    renderUserAuth () {
        console.log('Navbar user');
        this.root.innerHTML = renderTopNavUserView({});
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderAuthBlock({
                user: user
            });
            this.goProfileListener();
        }
    }

    renderNotAuth () {
        console.log('Navbar user');
        this.root.innerHTML = renderTopNavUserView({});
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderNotAuthBlock({});
            this.goLoginListener();
        }
    }

    renderRestaurantAuth () {
        console.log('Navbar restaurant');
        this.root.innerHTML = renderTopNavRestaurantView({});
        document.getElementById('auth_block').innerHTML = renderAuthBlock({
            user: restaurant,
        });
        this.goProfileListener();
    }

    goLoginListener () {
        const loginLink = document.getElementById('js-go-login')
        if (loginLink) {
            loginLink.addEventListener('click', () => {
                this.goTo('login');
            });
        }
    }

    goProfileListener() {
        const profileLink = document.getElementById('js-go-profile')
        if (profileLink) {
            profileLink.addEventListener('click', () => {
                this.goTo('profile');
            })
        }
    }
}
