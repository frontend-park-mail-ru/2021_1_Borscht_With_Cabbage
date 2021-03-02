// TODO scatter *Page functions into separate modules

import { renderLoginView } from './templates/loginTemplate.js';
import { renderTopNavView } from './templates/topNavTemplate.js';
import { renderMainView } from './templates/mainPageTemplate.js';
import { renderStoreView } from './templates/storeTemplate.js';
import {
    renderProfileView,
    renderProfileUserdataView,
    renderProfileOrdersView,
    renderProfileChatsView
} from './templates/profileTemplate.js';

const HttpModule = window.HttpModule;

const application = document.getElementById('app');

// const config = {
//     login: {
//         href: '/login',
//         text: 'Авторизоваться!',
//         open: loginPage,
//     },
//     profile: {
//         href: '/profile',
//         text: 'Профиль',
//         open: profilePage,
//     },
//     basket: {
//         href: '/basket',
//         text: 'Корзина',
//         open: basketPage,
//     },
// }

function menuPage () {
    // TODO correct work with this function
    HttpModule.get({
        url: '/main',
        callback: (_, response) => {
            const info = JSON.parse(response);
            mainPage(info);
        }
    });
}

function navbar ({ auth = false } = {}) {
    const topNavBar = document.createElement('div');
    topNavBar.innerHTML = renderTopNavView({})
    if (auth) {
        // TODO need to make img and profile menu (or just href)
    }
    application.append(topNavBar);
}

function loginPage () {
    navbar({});

    const login = document.createElement('div')
    login.innerHTML = renderLoginView({});
    application.append(login);

    const form = document.getElementById('auth-form');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const emailInput = document.getElementById('auth-login');
        const passwordInput = document.getElementById('auth-password');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        HttpModule.post({
            url: '/login',
            body: { email, password },
            callback: (status, response) => {
                // TODO correct work with login
                if (status === 200) {
                    console.log('khm, puk');
                } else {
                    const { error } = JSON.parse(response);
                    alert(error);
                }
            }
        });
    });
}

function profilePage () {
    navbar({ auth: true });
    const container = document.createElement('div');
    container.innerHTML = renderProfileView({});
    application.append(container);

    // TODO read that element user choose instead of this idiot switch
    // TODO make plug on server instead of plug here
    // TODO make option to change user data (server request etc)
    const choose = 2;
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

            HttpModule.post({
                url: '/edit',
                body: { email, password },
                callback: (status, response) => {
                    if (status === 200) {
                        // TODO overthink
                        profilePage();
                    } else {
                        const { error } = JSON.parse(response);
                        alert(error);
                    }
                }
            })
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

    application.append(container)
}

function basketPage () {
    // TODO it may delay
}

function mainPage (info) {
    navbar({ auth: true });
    const main = document.createElement('div');
    main.innerHTML = renderMainView(info);
    application.append(main);
}

function storePage (info) {
    navbar({});
    const store = document.createElement('div');
    store.innerHTML = renderStoreView(info);
    application.append(store);
}

menuPage();

application.addEventListener('click', e => {
    const { target } = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();
        // config[target.dataset.section].open();
    }
});
