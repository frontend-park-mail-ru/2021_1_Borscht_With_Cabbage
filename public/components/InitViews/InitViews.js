import { renderInitViews } from './InitViewsTmpl.js';

export class InitViews {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
    }

    render () {
        this.root.innerHTML = renderInitViews({});
    }

    getViewPlace () {
        return this.root.querySelector('#view-place');
    }

    getNavbarPlace () {
        return this.root.querySelector('#navbar');
    }
}
