import renderInitViews from './InitViewsTmpl.hbs';

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
        return this.root.querySelector('main');
    }

    getNavbarPlace () {
        return this.root.querySelector('header');
    }
}
