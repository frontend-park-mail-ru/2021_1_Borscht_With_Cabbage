import { noop } from '../../modules/utils.js';
import renderChat from './ChatTmpl.hbs';
import renderMessage from './MessageTmpl.hbs';
import user from '../../modules/user.js';

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
        console.log(info, this.root)
        let docID = '';
        if (user.role === 'user') {
            docID = '#profile-left-block';
        } else {
            docID = '#restaurant-left-block';
        }
        this.root.querySelector(docID).innerHTML = renderChat();
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
