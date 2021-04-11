import renderTopNavView from './NavbarTmpl.hbs';
import renderAuthBlock from './AuthBlockTmpl.hbs';
import renderNotAuthBlock from './NotAuthBlockTmpl.hbs';
import { noop } from '../../modules/utils.js';
import user from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import { AuthEvents } from '../../events/AuthEvents.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        eventBus.on(AuthEvents.userSignIn, this.renderAuth.bind(this));
        eventBus.on(AuthEvents.userLogout, this.renderNotAuth.bind(this));
    }

    render () {
        this.root.innerHTML = renderTopNavView({});
        if (user.isAuth) {
            this.renderAuth();
        } else {
            this.renderNotAuth();
        }
    }

    renderAuth () {
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderAuthBlock({
                user: user
            });
            this.goProfileListener();
        }
    }

    renderNotAuth () {
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
