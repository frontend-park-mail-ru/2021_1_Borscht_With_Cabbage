import { renderTopNavView } from './topNavTemplate.js';

export class NavBar {
    constructor (root) {
        const topNavBar = document.createElement('div');
        topNavBar.innerHTML = renderTopNavView({
            isUserAuth: window.isUserAuth,
            user: window.user,
            serverUrl: window.serverAddress
        });
        root.append(topNavBar);
    }
}
