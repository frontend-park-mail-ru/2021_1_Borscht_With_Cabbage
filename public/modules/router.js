const urls = {
    main: {
        constUrl: '/',
        regularUrl: null
    },
    store: {
        constUrl: null,
        regularUrl: /\/restaurant\/./
    }, // '/restaurant/:id'
    login: {
        constUrl: '/signin',
        regularUrl: null
    },
    signup: {
        constUrl: '/signup',
        regularUrl: null
    },
    restaurantSignup: {
        constUrl: '/restaurant/signup',
        regularUrl: null
    },
    basket: {
        constUrl: '/basket',
        regularUrl: null
    },
    profile: {
        constUrl: '/profile',
        regularUrl: /\/profile\/./
    }, // '/profile/edit', '/profile/orders', '/profile/chats'
    logout: {
        constUrl: '/logout',
        regularUrl: null
    }
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
        Object.entries(urls).forEach(([url, { constUrl, regularUrl }]) => {
            if (page === url && isBack && url === 'logout') {
                this.open('main', isBack);
                return
            }
            if (page === url || page === constUrl || (regularUrl && regularUrl.test(page))) {
                if (page === url) {
                    page = constUrl
                }
                this.windowHistory(page, isBack)
                if (this.routes.get(url)) {
                    this.routes.get(url).render(page);
                } else {
                    this.open('main', isBack)
                }
            }
        })
    }

    addRoute (page, handler) {
        this.routes.set(page, handler);
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
