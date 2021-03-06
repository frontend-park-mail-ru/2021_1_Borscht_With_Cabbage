import { renderTopNavView } from './topNavTemplate.js';

export function navbar ({ auth = false } = {}, root) {
    const topNavBar = document.createElement('div');
    topNavBar.innerHTML = renderTopNavView({})
    if (auth) {
        // TODO need to make img and profile menu (or just href)
    }
    root.append(topNavBar);
}
