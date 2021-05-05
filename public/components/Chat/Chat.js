import './Chat.less';
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
        this.biggestID = 0;
    }

    render (info) {
        this.data = info[0];
        let docID = '';
        if (user.role === 'user') {
            docID = '#profile-left-block';
        } else {
            docID = '#restaurant-left-block';
        }
        this.root.querySelector(docID).innerHTML = renderChat(this.data);

        this.data.messages.forEach(message => {
            const position = message.fromMe ? 'right' : 'left';
            this.renderNewMessage(message, position, 'afterbegin');
        });

        this.addListeners();
    }

    renderNewMessage (message, position = 'left', where = 'beforeend') {
        console.log(message, position, where)
        this.root
            .querySelector('.message-container')
            .insertAdjacentHTML(where, renderMessage({
                message: message.text,
                id: message.id
            }));
        this.root
            .querySelector(`[data-messageID="${message.id}"]`)
            .classList.add(position);
        if (this.biggestID < message.id) {
            this.biggestID = message.id;
        }
        this.scrollDown();
    }

    sendMessage () {
        const input = this.root.querySelector('#js__send-input');
        const text = input.value;
        if (text) {
            this.controller.sendMessage(text, this.data.id);
            this.renderNewMessage({ text, id: ++this.biggestID }, 'right');
            input.value = '';
            this.scrollDown();
        }
    }

    addListeners () {
        this.root
            .querySelector('#js__send-input')
            .addEventListener('keyup', event => {
                if (event.keyCode === 13) {
                    this.sendMessage();
                }
            });

        this.root
            .querySelector('#js__send-button')
            .addEventListener('click', () => {
                this.sendMessage();
            });
    }

    scrollDown () {
        this.root.querySelector('.message-container').scrollTop = this.root.querySelector('.message-container').scrollHeight;
    }
}
