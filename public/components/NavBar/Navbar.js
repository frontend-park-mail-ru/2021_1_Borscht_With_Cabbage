import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './NavbarTmpl.js';

export class Navbar {
    constructor ({
        root = document.body,
        goTo = null
    } = {}) {
        this.goTo = goTo;
        this.root = root;
    }

    render() {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = renderTopNavView({})
        this.root.insertAdjacentElement('afterbegin', newDiv)

        const authBlock = document.getElementById('auth_block');
        if (window.isUserAuth) {
            console.log("user is authorized")
            authBlock.innerHTML = renderAuthBlock({
                user: window.user,
                serverUrl: window.serverAddress
            });
            this.goProfileListener();
        } else {
            console.log("user is not authorized")
            authBlock.innerHTML = renderNotAuthBlock({});
            this.goLoginListener();
        }
    }

    goLoginListener() {
        const loginLink = document.getElementById('js-go-login')
        if (loginLink) {
            loginLink.addEventListener('click', () => {this.goTo('login')});
        }
    }

    goProfileListener() {
        const profileLink = document.getElementById('js-go-profile')
        if (profileLink) {
            profileLink.addEventListener('click', () => {this.goTo('profile')})
        }
    }
}
