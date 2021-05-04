import { RestaurantMainController } from 'Controllers/RestaurantMainController.js';
import { RestaurantEdits } from '../RestaurantEdits/RestaurantEdits.js';
import user from 'Modules/user.js';
import renderRestaurantRightMenu from './RightMenuTmpl.hbs';
import { RestaurantMenuComponent } from '../RestaurantMenu/RestaurantMenu.js';
import { RestaurantOrdersComponent } from "../RestaurantOrders/RestaurantOrders.js";

export class RestaurantRightMenu {
    constructor ({
        root = document.body,
        restaurantController = new RestaurantMainController(),
        editsView = new RestaurantEdits({
            root,
            user,
            controller: restaurantController
        }),
        menuView = new RestaurantMenuComponent({
            root,
            controller: restaurantController
        }),
        ordersView = new RestaurantOrdersComponent({
            root,
            controller: restaurantController
        })
    } = {}) {
        this.root = root;
        this.restaurantController = restaurantController;
        this.editsView = editsView;
        this.menuView = menuView;
        this.ordersView = ordersView;
    }

    render () {
        this.root.innerHTML = renderRestaurantRightMenu({});

        this.addLinksListeners()
    }

    addLinksListeners () {
        const editsID = 'restaurant-menu__edit'
        const edits = document.getElementById(editsID)
        if (edits) {
            edits.onclick = () => {
                this.editsView.render()
            }
        }

        const menuID = 'restaurant-menu__menu'
        const menu = document.getElementById(menuID)
        if (menu) {
            menu.onclick = () => {
                this.menuView.render()
            }
        }

        const ordersID = 'restaurant-menu__orders'
        const orders = document.getElementById(ordersID)
        if (orders) {
            orders.onclick = () => {
                this.ordersView.render()
            }
        }

        const chatsID = 'restaurant-menu__chats'
        const chats = document.getElementById(chatsID)
        if (chats) {
            chats.onclick = () => {

            }
        }
    }

}