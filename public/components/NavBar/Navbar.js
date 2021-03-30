import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './NavbarTmpl.js';
import { noOp } from '../../modules/utils.js';
import user from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import AuthEvents from '../../events/AuthEvents.js';
import { Toast } from '../Toast/Toast.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = noOp
    } = {}) {
        this.goTo = goTo;
        this.root = root
        this.root.innerHTML = renderTopNavView({});
        if (user.isAuth) {
            this.userAuth()
        } else {
            this.userLogout()
        }
        this.toast = new Toast({ root: this.root.querySelector('.navbar-title') })
        eventBus.on(AuthEvents.userSignIn, this.userAuth.bind(this))
        eventBus.on(AuthEvents.userLogout, this.userLogout.bind(this))
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

    goLoginListener () {
        const loginLink = document.getElementById('js_goLogin')
        if (loginLink) {
            loginLink.addEventListener('click', () => {
                this.goTo('login')
            });
        }
    }

    goProfileListener () {
        const profileLink = document.getElementById('js_toProfile')
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
