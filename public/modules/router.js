const urls = {
    main: '/',
    store: '/restaurant',
    login: '/signin',
    signup: '/signup',
    basket: '/basket',
    profile: '/profile'
};

const regStore = /([0-9]{1,30})/;

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
        if (regStore.test(page)) {
            realPage = page;
            page = urls['store'];
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
