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
        window.addEventListener('popstate', (event) => {
            this.open(window.location.pathname, true);
        })
    }

    windowHistory (page, isBack) {
        if (!isBack) {
            window.history.pushState({}, '', page)
        }
        window.history.replaceState({}, '', page);
    }

    open (page, isBack = false) {
        const reverseUrls = Object.fromEntries(Object.entries(urls).map(([key, value]) => [value, key]))
        if (reverseUrls[page]) {
            page = reverseUrls[page]
        }

        if ((page === 'login' || page === 'signup') && window.isUserAuth) {
            this.open('main', isBack);
            return
        }

        if (urls[page]) {
            if (page === urls.logout && isBack) {
                this.open('main', isBack);
            }
            this.windowHistory(urls[page], isBack)
            if (this.routes.get(urls[page])) {
                this.routes.get(urls[page]).render();
                return
            }
        }

        if (/\/restaurant\/./.test(page)) {
            this.windowHistory(page, isBack)
            const id = page.substring('/restaurant'.length);
            this.routes.get(urls.store).render(id);
            return
        }

        this.open('main', isBack);
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
