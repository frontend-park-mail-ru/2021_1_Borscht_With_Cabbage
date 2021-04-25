import renderTopNavUserView from './NavbarUserTmpl.hbs';
import renderTopNavRestaurantView from './NavbarRestaurantTmpl.hbs';
import renderAuthBlock from './AuthBlockTmpl.hbs';
import renderNotAuthBlock from './NotAuthBlockTmpl.hbs';
import { noop } from '../../modules/utils.js';
import user from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import { AuthEvents } from '../../events/AuthEvents.js';
import { Toast } from '../Toast/Toast.js';
import './Navbar.less'
import { ConfirmationAddress } from '../ConfirmationAddress/ConfirmationAddress.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.toast = null;
        eventBus.on(AuthEvents.userSignIn, this.renderUserAuth.bind(this));
        eventBus.on(AuthEvents.userLogout, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.notAuth, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.changeActiveAddress, this.changeAddress.bind(this))
    }

    onOffline () {
        if (!this.toast) {
            this.toast = new Toast({ root: this.root.querySelector('.navbar_title') });
            eventBus.on(AuthEvents.offline, this.toast.render.bind(this.toast));
        }
    }

    render () {
    }

    renderUserAuth (info) {
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
        this.onOffline();
        this.addEventListener();
    }

    renderNotAuth () {
        this.root.innerHTML = renderTopNavUserView({});
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderNotAuthBlock({});
            this.goLoginListener();
        }
        this.onOffline();
        this.addEventListener();
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
                this.goTo('/profile/edits');
            });
        }
    }

    addEventListener () {
        const bascetLink = document.getElementById('js-go-basket')
        if (bascetLink) {
            bascetLink.addEventListener('click', () => {
                this.goTo('/basket');
            });
        }

        const address_ = this.root.querySelector('#address');
        if (address_) {
            address_.addEventListener('click', () => {
                new ConfirmationAddress({ goTo: this.goTo }).render();
            });
        }
    }

    changeAddress ({ name }) {
        const address = this.root.querySelector('#address');
        if (address) {
            address.textContent = name;
        }
    }
}
