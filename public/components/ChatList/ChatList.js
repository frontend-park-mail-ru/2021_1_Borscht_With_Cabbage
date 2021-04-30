import { noop } from '../../modules/utils.js';
import renderChatList from './ChatListTmpl.hbs';
import user from '../../modules/user.js';

export class ChatList {
    constructor ({
        root = document.body,
        goTo = noop,
        controller
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (info) {
        let redir = '';
        if (user.role === 'user') {
            redir = '/profile';
        } else {
            redir = '/restaurant';
        }
        this.root.innerHTML = renderChatList();
        this.root
            .querySelector('#js__add-chat__button')
            .addEventListener('click', () => {
                this.goTo(redir + '/chats/1');
            });
    }
}
