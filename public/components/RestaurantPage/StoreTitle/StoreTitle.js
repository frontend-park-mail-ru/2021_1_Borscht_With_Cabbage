import { renderStoreTitle } from './StoreTitleTmpl.js';

export class StoreTitle {
    constructor ({
        root = document.body,
        title = 'Default restaurant'
    } = {}) {
        this.root = root;
        this.title = title;
    }

    render () {
        this.root.innerHTML = renderStoreTitle(this.title);
    }
}
