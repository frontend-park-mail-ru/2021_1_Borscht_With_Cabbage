import { renderAuthBlock, renderNotAuthBlock, renderTopNavView } from './topNavTemplate.js';

export class NavBar {
    constructor (root) {
        const topNavBar = document.createElement('div');
        topNavBar.innerHTML = renderTopNavView({});
        root.append(topNavBar);

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
