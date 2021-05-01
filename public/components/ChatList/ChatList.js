import './ChatList.less';
import { noop } from '../../modules/utils.js';
import renderChatList from './ChatListTmpl.hbs';
import renderNode from './ChatNodeTmpl.hbs';
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

        info.forEach(value => {
            value.lastMessage = value['last message'];
            console.log(value)
        });

        console.log(info);
        let redir = '';
        if (user.role === 'user') {
            redir = '/profile';
            this.root = document.getElementById('profile-left-block');
        } else {
            redir = '/restaurant';
            this.root = document.getElementById('restaurant-left-block');
        }
        this.root.innerHTML = renderChatList();

        info.forEach(value => {
            this.root
                .querySelector('#js__chat-list')
                .insertAdjacentHTML('afterbegin', renderNode(value));
            this.root
                .querySelector(`[data-chatID="${value.id}"]`)
                .addEventListener('click', () => {
                    this.goTo(redir + `/chats/${value.id}`);
                });
            console
                .log(value,
                    this.root.querySelector('#js__chat-list'),
                    this.root.querySelector(`[data-chatID="${value.id}"]`))
        });
    }
}
