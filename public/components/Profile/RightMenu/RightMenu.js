import renderRightMenu from "./RightMenuTmpl.hbs";
import { ProfileController } from "../../../controllers/ProfileController.js";
import { ProfileEdits } from "../ProfileEdits/ProfileEdits.js";
import { Orders } from "../Orders/Orders.js";

export class RightMenu {
    constructor ({
        root = document.body,
        profileController = new ProfileController(),
        editsView = new ProfileEdits(),
        ordersView = new Orders(),
    } = {}) {
        this.root = root
        this.profileController = profileController
        this.editsView = editsView
        this.ordersView = ordersView
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
                this.editsView.render()
            }
        }

        const ordersID = 'profile-menu__orders'
        const orders = document.getElementById(ordersID)
        if (orders) {
            orders.onclick = () => {
                this.ordersView.render()
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