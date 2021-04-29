import renderRightMenu from './RightMenuTmpl.hbs';
import { noop } from '../../../modules/utils.js';

export class RightMenu {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
    }

    render () {
        const profilePlace = document.getElementById('profile-right-block')
        profilePlace.innerHTML = renderRightMenu({});

        this.addLinksListeners()
    }

    addLinksListeners () {
        const editsID = 'profile-menu__edit'
        const edits = document.getElementById(editsID)
        if (edits) {
            edits.addEventListener('click', () => {
                this.goTo('/profile/edit');
            });
        }

        const ordersID = 'profile-menu__orders'
        const orders = document.getElementById(ordersID)
        if (orders) {
            orders.addEventListener('click', () => {
                this.goTo('/profile/orders');
            });
        }

        const chatsID = 'profile-menu__chats'
        const chats = document.getElementById(chatsID)
        if (chats) {
            chats.addEventListener('click', () => {

            });
        }
    }
}
