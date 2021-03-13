import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './topNavTemplate.js';

export class NavBar {
    constructor ({
        root = document.body
    } = {}) {
        root.innerHTML += renderTopNavView({});
        const authBlock = document.getElementById('auth_block');
        if (window.isUserAuth) {
            authBlock.innerHTML = renderAuthBlock({
                user: window.user,
                serverUrl: window.serverAddress
            });
        } else {
            authBlock.innerHTML = renderNotAuthBlock({});
        }
    }
}
