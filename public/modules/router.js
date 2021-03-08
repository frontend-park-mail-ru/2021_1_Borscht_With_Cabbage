const urls = {
    'main': '/',
    'store': '/puk',
    'login': '/login',
    'signup': '/signup',
    'basket': '/basket',
    'profile': '/profile'
};

export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();
        this.catchFollowLinks = this.catchFollowLinks.bind(this);
        this.root.addEventListener('click', this.catchFollowLinks);
    }

    open (page) {
        if (urls[page])
            page = urls[page];

        window.history.replaceState({}, '', page);
        this.routes.get(page).render();
    }

    addRoute (page, handler) {
        this.routes.set(urls[page], handler);
    }

    catchFollowLinks (event) {
        if (event.target instanceof HTMLAnchorElement) {
            event.preventDefault();
            const link = event.target.pathname;
            this.open(link);
        }

        if (event.target instanceof HTMLButtonElement) {
            event.preventDefault();
        }
    }
}
