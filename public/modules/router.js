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
        const reverseUrls = Object.fromEntries(Object.entries(urls).map(([key, value]) => [value, key]))
        if (reverseUrls[page]) {
            page = reverseUrls[page]
        }

        if ((page === 'login' || page === 'signup') && window.isUserAuth) {
            this.open('main');
            return
        }

        if (urls[page]) {
            window.history.replaceState({}, '', urls[page]);
            if (this.routes.get(urls[page])) {
                this.routes.get(urls[page]).render();
            }
            return
        }

        if (/\/restaurant\/./.test(page)) {
            window.history.replaceState({}, '', page);
            const id = page.substring('/restaurant'.length);
            this.routes.get(urls.store).render(id);
            return;
        }

        this.open('main');
    }

    addRoute (page, handler) {
        this.routes.set(urls[page], handler);
    }

    catchFollowLinks (event) {
        if (event.target.closest('a') instanceof HTMLAnchorElement) {
            event.preventDefault();
            const link = event.target.closest('a').pathname;
            this.open(link);
        }

        if (event.target instanceof HTMLButtonElement) {
            event.preventDefault();
        }
    }
}
