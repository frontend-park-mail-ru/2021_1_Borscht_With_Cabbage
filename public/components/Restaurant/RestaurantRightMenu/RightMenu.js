import renderRestaurantRightMenu from './RightMenuTmpl.hbs';
import { noop } from '../../../modules/utils.js';

export class RestaurantRightMenu {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root.querySelector('#restaurant-right-block');
        this.goTo = goTo;
    }

    render () {
        // if (!document.getElementById('restaurant-menu__edit')) {
            this.root = document.getElementById('restaurant-right-block');
            this.root.innerHTML = renderRestaurantRightMenu({});
            this.addLinksListeners();
        // }
    }

    addLinksListeners () {
        const editsID = 'restaurant-menu__edit';
        const edits = document.getElementById(editsID);
        if (edits) {
            edits.addEventListener('click', () => {
                this.goTo('/restaurant/edits');
            });
        }

        const menuID = 'restaurant-menu__menu';
        const menu = document.getElementById(menuID);
        if (menu) {
            menu.addEventListener('click', () => {
                this.goTo('/restaurant/menu');
            });
        }

        const ordersID = 'restaurant-menu__orders';
        const orders = document.getElementById(ordersID);
        if (orders) {
            orders.addEventListener('click', () => {
                // TODO
            });
        }

        const chatsID = 'restaurant-menu__chats';
        const chats = document.getElementById(chatsID);
        if (chats) {
            chats.addEventListener('click', () => {
                this.goTo('/restaurant/chats');
            });
        }
    }
}
