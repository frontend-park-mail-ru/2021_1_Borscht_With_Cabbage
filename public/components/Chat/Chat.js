import { noop } from '../../modules/utils.js';
import renderChat from './ChatTmpl.hbs';
import renderMessage from './MessageTmpl.hbs';

export class Chat {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = null
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (info) {
        this.root.innerHTML = renderChat();
        this.root
            .querySelector('#js__send-button')
            .addEventListener('click', () => {
                this.controller.sendMessage(this.root.querySelector('#js__send-input').value);
            });
    }

    renderNewMessage (message) {
        this.root.insertAdjacentHTML('beforeend', renderMessage({ message: message.message.text }));
    }
}
