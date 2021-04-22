import renderDropList from './DropListTmpl.hbs';
import eventBus from '../../modules/eventBus.js';
import { DropListEvents } from '../../events/DropListEvents.js';
import './DropList.less'

export class DropListComponent {
    constructor ({
        idList = '',
        root = document.body,
        content = null
    } = {}) {
        this.idList = idList;
        this.root = root;
        this.content = content;
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

            eventBus.emit(DropListEvents.closeDropListComponent + this.idList);
            eventBus.emit(DropListEvents.chooseElement + this.idList, item.dataset.list);
        })
    }
}
