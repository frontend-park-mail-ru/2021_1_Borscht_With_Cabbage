import renderTopNavUserView from './NavbarUserTmpl.hbs';
import renderTopNavRestaurantView from './NavbarRestaurantTmpl.hbs';
import renderAuthBlock from './AuthBlockTmpl.hbs';
import renderNotAuthBlock from './NotAuthBlockTmpl.hbs';
import { noop } from '../../modules/utils.js';
import user from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import { AuthEvents } from '../../events/AuthEvents.js';
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
        this.toast = new Toast({ root: this.root.querySelector('.navbar-title') })
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
