const urls = {
    main: '/',
    store: '/restaurant',
    login: '/signin',
    signup: '/signup',
    basket: '/basket',
    profile: '/user',
    logout: '/logout'
};

export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();
        this.catchFollowLinks = this.catchFollowLinks.bind(this);
        this.root.addEventListener('click', this.catchFollowLinks);
    }

    open (page) {
        if (urls[page]) {
            page = urls[page];
        }

        // TODO correct
        //  это костыль для отображения динамически формируемых страниц ресторана
        let realPage;
        if (/([0-9]{1,30})/.test(page)) {
            realPage = page;
            page = urls.store;
        }

        if ((/\/signin/.test(page) || /\/signup/.test(page)) && window.isUserAuth) {
            this.open(urls.main);
            return;
        }

        window.history.replaceState({}, '', page);
        this.routes.get(page).render(realPage);
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
