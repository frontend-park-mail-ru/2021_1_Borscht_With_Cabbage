import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './NavbarTmpl.js';
import { renderTopNavRestaurantView, renderTopNavUserView } from './NavbarTmpl.js';

import { noop } from '../../modules/utils.js';
import user from '../../modules/user.js';
import restaurant from '../../modules/restaurant.js';
import eventBus from '../../modules/eventBus.js';
import AuthEvents from '../../events/AuthEvents.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        eventBus.on(AuthEvents.userSignIn, this.userAuth.bind(this))
        eventBus.on(AuthEvents.userLogout, this.userLogout.bind(this))
        eventBus.on(AuthEvents.restaurantSignIn, this.restaurantAuth.bind(this))
        eventBus.on(AuthEvents.restaurantLogout, this.restaurantLogout.bind(this))
    }

    render () {
        this.root.innerHTML = renderTopNavView({});
        this.navbar = this.root.querySelector('.navbar');
        this.renderUser();
    }

    renderUser () {
        console.log('Navbar user');
        this.navbar.innerHTML = renderTopNavUserView({});
        if (user.isAuth) {
            this.userAuth();
        } else {
            this.userLogout();
        }
    }

    renderRestaurant () {
        if (restaurant.isAuth) {
            console.log('Navbar restaurant');
            this.navbar.innerHTML = renderTopNavRestaurantView({});
            return;
        }
        this.renderUser();
    }

    userAuth () {
        document.getElementById('auth_block').innerHTML = renderAuthBlock({
            user: user,
            serverUrl: window.serverAddress
        });
        this.goProfileListener();
    }

    userLogout () {
        document.getElementById('auth_block').innerHTML = renderNotAuthBlock({});
        this.goLoginListener();
    }

    restaurantAuth () {
        this.renderRestaurant();
        document.getElementById('auth_block').innerHTML = renderAuthBlock({
            user: restaurant,
            serverUrl: window.serverAddress
        });
        this.goProfileListener();
    }

    restaurantLogout () {
        this.renderUser();
    }


    goLoginListener () {
        const loginLink = document.getElementById('js-go-login')
        if (loginLink) {
            loginLink.addEventListener('click', () => {
                this.goTo('login')
            });
        }
    }

    goProfileListener() {
        const profileLink = document.getElementById('js-go-profile')
        if (profileLink) {
            profileLink.addEventListener('click', () => {
                this.goTo('profile')
            })
        }
    }

    getViewPlace () {
        return this.root.querySelector('#view-place')
    }
}
