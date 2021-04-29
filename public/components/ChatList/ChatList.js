import { noop } from '../../modules/utils.js';
import { ProfileController } from '../../controllers/ProfileController.js';

export class ChatList {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (info) {

    }
}
