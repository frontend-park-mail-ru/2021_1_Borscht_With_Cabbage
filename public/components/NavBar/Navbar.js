import renderTopNavUserView from './NavbarUserTmpl.hbs';
import renderTopNavRestaurantView from './NavbarRestaurantTmpl.hbs';
import renderAuthBlock from './AuthBlockTmpl.hbs';
import renderNotAuthBlock from './NotAuthBlockTmpl.hbs';
import { noop } from 'Modules/utils.js';
import user from 'Modules/user.js';
import eventBus from 'Modules/eventBus.js';
import { AuthEvents } from 'Events/AuthEvents.js';
import { Toast } from '../Toast/Toast.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        eventBus.on(AuthEvents.userSignIn, this.renderUserAuth.bind(this));
        eventBus.on(AuthEvents.userLogout, this.renderNotAuth.bind(this));
        // eventBus.on(AuthEvents.restaurantSignIn, this.renderRestaurantAuth.bind(this));
        // eventBus.on(AuthEvents.restaurantLogout, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.notAuth, this.renderNotAuth.bind(this));
    }

    render () {
    }

    renderUserAuth (info) {
        console.log('Navbar user');
        if (info.role === 'user') {
            this.root.innerHTML = renderTopNavUserView({});
        } else {
            info.name = info.title;
            this.root.innerHTML = renderTopNavRestaurantView({});
        }
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderAuthBlock({
                user: info
            });
            this.goProfileListener();
        }
        console.log(';l;l;l;l;l', this.root.querySelector('.navbar_title'))
        this.toast = new Toast({ root: this.root.querySelector('.navbar_title') });
    }

    renderNotAuth () {
        console.log('Navbar user');
        this.root.innerHTML = renderTopNavUserView({});
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderNotAuthBlock({});
            this.goLoginListener();
        }
        this.toast = new Toast({ root: this.root.querySelector('.navbar_title') });
    }

    goLoginListener () {
        const loginLink = document.getElementById('js-go-login')
        if (loginLink) {
            loginLink.addEventListener('click', () => {
                this.goTo('login');
            });
        }
    }

    goProfileListener () {
        const profileLink = document.getElementById('js-go-profile')
        if (profileLink) {
            profileLink.addEventListener('click', () => {
                this.goTo('profile');
            })
        }
    }
}
