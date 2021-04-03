import { renderDropList } from './DropListTmpl.js';

export class DropListComponent {
    constructor ({
        root = document.body,
        content = null,
        callback = null
    } = {}) {
        this.root = root;
        this.content = content;
        this.callback = callback;
    }

    add () {
        this.listItem = document.createElement('div');

        this.listItem.innerHTML = renderDropList({ content: this.content });
        this.root.append(this.listItem);

        this.addDropListeners();
    }

    remove () {
        this.listItem.remove();
    }

    addDropListeners () {
        const dropList = this.root.querySelector('.drop-list__slider');
        if (!dropList) {
            return;
        }

        dropList.addEventListener('click', e => {
            const { target } = e;

            e.preventDefault();

            const item = target.closest('.list__btn');
            if (!item) {
                return;
            }

            this.remove();
            this.callback(item.dataset.list);
        })
    }
}
