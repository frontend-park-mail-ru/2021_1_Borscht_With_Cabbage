import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './NavbarTmpl.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = null
    } = {}) {
        this.goTo = goTo;
        root.innerHTML += renderTopNavView({});
        const authBlock = document.getElementById('auth_block');
        if (window.isUserAuth) {
            authBlock.innerHTML = renderAuthBlock({
                user: window.user,
                serverUrl: window.serverAddress
            });
        this.goProfileListener();
        } else {
            authBlock.innerHTML = renderNotAuthBlock({});
            this.goLoginListener();
        }
    }

    goLoginListener() {
        const loginLink = document.getElementById('js_goLogin')
        if (loginLink) {
            loginLink.addEventListener('click', () => {this.goTo('login')});
        }
    }

    goProfileListener() {
        const profileLink = document.getElementById('js_toProfile')
        if (profileLink) {
            profileLink.addEventListener('click', () => {this.goTo('profile')})
        }
    }
}
