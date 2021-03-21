import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './topNavTemplate.js';

export class NavBar {
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
        } else {
            authBlock.innerHTML = renderNotAuthBlock({});
            this.goLoginListener();
        }
    }

    goLoginListener() {
        const loginLink = document.getElementById('js_go_login')
        if (loginLink) {
            loginLink.addEventListener('click', () => {this.goTo('login')});
        }
    }
}
