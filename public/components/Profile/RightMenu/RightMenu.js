import renderRightMenu from "./RightMenuTmpl.hbs";
import { ProfileController } from "Controllers/ProfileController.js";
import { ProfileEdits } from "../ProfileEdits/ProfileEdits.js";
import { Orders } from "../Orders/Orders.js";
import { noop } from '../../../modules/utils.js';

export class RightMenu {
    constructor ({
        root = document.body,
        profileController = new ProfileController(),
        editsView = new ProfileEdits(),
        ordersView = new Orders(),
        goTo = noop
    } = {}) {
        this.root = root;
        this.profileController = profileController;
        this.editsView = editsView;
        this.ordersView = ordersView;
        this.goTo = goTo;
    }

    render () {
        const profilePlace = document.getElementById('profile-right-block')
        profilePlace.innerHTML = renderRightMenu({});

        this.addLinksListeners()
    }

    addLinksListeners() {
        const editsID = 'profile-menu__edit'
        const edits = document.getElementById(editsID)
        if (edits) {
            edits.onclick = () => {
                this.goTo('/profile/edit');
            }
        }

        const ordersID = 'profile-menu__orders'
        const orders = document.getElementById(ordersID)
        if (orders) {
            orders.onclick = () => {
                this.goTo('/profile/orders');
            }
        }

        const chatsID = 'profile-menu__chats'
        const chats = document.getElementById(chatsID)
        if (chats) {
            chats.onclick = () => {

            }
        }
    }

}