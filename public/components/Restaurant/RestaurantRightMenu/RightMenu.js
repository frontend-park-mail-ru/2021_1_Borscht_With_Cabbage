import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import { RestaurantEdits } from '../RestaurantEdits/RestaurantEdits.js';
import user from '../../../modules/user.js';
import { renderRestaurantRightMenu } from './RightMenuTmpl.js';
import { RestaurantMenuComponent } from '../RestaurantMenu/RestaurantMenu.js';

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
        })
    } = {}) {
        this.root = root;
        this.restaurantController = restaurantController;
        this.editsView = editsView;
        this.menuView = menuView;
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