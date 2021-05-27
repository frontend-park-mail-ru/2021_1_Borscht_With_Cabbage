import renderTopNavUserView from './NavbarUserTmpl.hbs';
import renderTopNavRestaurantView from './NavbarRestaurantTmpl.hbs';
import renderAuthBlock from './AuthBlockTmpl.hbs';
import renderNotAuthBlock from './NotAuthBlockTmpl.hbs';
import { noop } from '../../modules/utils.js';
import { AuthEvents } from '../../events/AuthEvents.js';
import { Toast } from '../Toast/Toast.js';
import { ConfirmationAddress } from '../ConfirmationAddress/ConfirmationAddress.js';
import address from '../../modules/address.js';
import user from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import './Navbar.less'

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.toast = null;
        this.address = address.name || 'Адрес доставки';
        eventBus.on(AuthEvents.userSignIn, this.renderUserAuth.bind(this));
        eventBus.on(AuthEvents.userLogout, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.notAuth, this.renderNotAuth.bind(this));
        eventBus.on(AuthEvents.changeActiveAddress, this.changeAddress.bind(this));
    }

    onOffline () {
        this.toast = new Toast({ root: this.root.querySelector('.navbar_title') });
        eventBus.on(AuthEvents.offline, this.toast.render.bind(this.toast));
    }

    render () {
    }

    renderUserAuth (info) {
        let path = '';
        if (info.role === 'user') {
            this.root.innerHTML = renderTopNavUserView({ address: this.address });
            path = '/profile';
        } else {
            info.name = info.title;
            this.root.innerHTML = renderTopNavRestaurantView({});
            path = '/restaurant';
        }
        const authBlock = document.getElementById('auth_block');
        if (authBlock) {
            authBlock.innerHTML = renderAuthBlock({
                user: info
            });
            this.goProfileListener(path);
        }
        this.onOffline();
        this.addEventListener();
    }

    renderNotAuth () {
        this.root.innerHTML = renderTopNavUserView({ address: address.getAddress().name });
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

    goProfileListener (path) {
        const profileLink = document.getElementById('js-go-profile')
        if (profileLink) {
            profileLink.addEventListener('click', () => {
                this.goTo(path + '/edits');
            });
        }
    }

    addEventListener () {
        const bascetLink = document.getElementById('js-go-basket')
        if (bascetLink) {
            bascetLink.addEventListener('click', () => {
                this.goTo('/chose/all');
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
