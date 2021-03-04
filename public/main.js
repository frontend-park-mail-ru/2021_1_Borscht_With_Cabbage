// TODO scatter *Page functions into separate modules

import { renderLoginView } from './templates/loginTemplate.js';
import { renderSignUpView } from './templates/signupTemplate.js';
import { renderTopNavView } from './templates/topNavTemplate.js';
import { renderMainView } from './templates/mainPageTemplate.js';
import { renderStoreView } from './templates/storeTemplate.js';
import {
    renderProfileView,
    renderProfileUserdataView,
    renderProfileOrdersView,
    renderProfileChatsView
} from './templates/profileTemplate.js';
import { ajaxGet, ajaxPost } from "./modules/http.js";
import { Router } from "./modules/router.js";


const application = document.getElementById('app');

function navbar ({ auth = false } = {}, root) {
    const topNavBar = document.createElement('div');
    topNavBar.innerHTML = renderTopNavView({})
    if (auth) {
        // TODO need to make img and profile menu (or just href)
    }
    root.append(topNavBar);
}

function loginPage (root) {
    root.innerHTML = '';
    navbar({}, root);

    const login = document.createElement('div')
    login.innerHTML = renderLoginView({});
    root.append(login);

    const form = document.getElementById('auth-form');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const emailInput = document.getElementById('auth-login');
        const passwordInput = document.getElementById('auth-password');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let resolve = function (status, response) {
            // TODO correct work
            console.log('khm, puk');
        };

        let reject = function (status, response) {
            const error = JSON.parse(response);
            alert(error);
        };

        ajaxPost({
            url: '/login',
            body: { email, password }
        })
            .then(resolve)
            .catch(reject);
    });
}

function signupPage (root) {
    root.innerHTML = '';
    navbar({ auth: false }, root);
    const signup = document.createElement('div')
    signup.innerHTML = renderSignUpView({});
    root.append(signup);
}

function profilePage (root) {
    root.innerHTML = '';
    navbar({ auth: true }, root);
    const container = document.createElement('div');
    container.innerHTML = renderProfileView({});
    root.append(container);

    // TODO read that element user choose instead of this idiot switch
    // TODO make plug on server instead of plug here
    // TODO make option to change user data (server request etc)
    const choose = 1;
    const mainBlock = document.getElementById('profile-main_block');
    switch (choose) {
    case 0: {
        mainBlock.innerHTML = renderProfileUserdataView({});

        const form = document.getElementById('profile-form-userdata');
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const emailInput = document.getElementById('edit-login');
            const passwordInput = document.getElementById('edit-password');

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            ajaxPost({
                    url: '/edit',
                    body: { email, password }
                }
            )
                .then(r => profilePage())
                .catch(r => console.log(`THis crash when post /edit from ${r}`));
        });
        break;
    }
    case 1: {
        mainBlock.innerHTML = renderProfileOrdersView({
            order: [
                'McDonalds',
                'KFC',
                'BurgerKing'
            ]
        });
        break;
    }
    case 2: {
        mainBlock.innerHTML = renderProfileChatsView({
            chat: [
                'McDonalds',
                'KFC',
                'BurgerKing'
            ]
        });
        break;
    }
    default: {
        break;
    }
    }

    root.append(container)
}

function basketPage () {
    // TODO it may delay
}

function mainPageDraw (root, info) {
    root.innerHTML = '';
    navbar({ auth: true }, root);
    const main = document.createElement('div');
    main.innerHTML = renderMainView(info);
    root.append(main);
}

function mainPage (root) {
    ajaxGet({ url : '/main'})
        .then(r => mainPageDraw(root, r.parsedJSON))
        .catch(r => console.log(`THis crash when post /main from ${r}`));
}

function storePageDraw (root, info) {
    root.innerHTML = '';
    navbar({ auth: true }, root);
    const store = document.createElement('div');
    store.innerHTML = renderStoreView(info);
    root.append(store);
}

function storePage (root) {
    ajaxGet({ url : '/store'})
        .then(r => storePageDraw(root, r.parsedJSON))
        .catch(r => console.log(`THis crash when post /store from ${r}`));
}

let router = new Router(application);
router.addRoute('/login', loginPage);
router.addRoute('/signup', signupPage);
router.addRoute('/', loginPage); // TODO correct this
router.addRoute('/store/syto', storePage); // TODO correct this
router.open(window.location.pathname);