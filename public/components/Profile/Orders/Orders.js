import eventBus from '../../../modules/eventBus.js';
import { noOp } from '../../../modules/utils.js';
import user from '../../../modules/user.js';
import ProfileEvents from '../../../events/ProfileEvents.js';
import { ProfileController } from '../../../controllers/ProfileController.js';
import { renderOrders } from "./OrderTmpl.js";

export class Orders {
    constructor ({
        root = document.body,
        goTo = noOp,
        user = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root
        this.user = user
        this.goTo = goTo
        this.controller = controller
    }

    render () {
        const profilePlace = document.getElementById('profile-left-block')
        profilePlace.innerHTML = renderOrders({
            user: this.user,
            serverUrl: window.serverAddress
        });

    }

}
