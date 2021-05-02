import renderDropList from './DropListTmpl.hbs';
import eventBus from '../../modules/eventBus.js';
import { DropListEvents } from '../../events/DropListEvents.js';
import './DropList.less'

class DropListComponent {
    constructor () {
    }

    render ({
        idList = '',
        root = document.body,
        content = null
    } = {}) {
        this.remove();
        this.root = root;
        this.content = content;
        this.idList = idList;

        this.listItem = document.createElement('div');

        this.listItem.innerHTML = renderDropList({ content: this.content });
        this.root.append(this.listItem);

        this.addDropListeners();
        this.addCloseListener();
    }

    remove () {
        if (this.listItem) {
            this.listItem.remove();
        }
    }

    addCloseListener () {
        const backgroundClose = this.root.querySelector('.drop-list__background');
        backgroundClose.addEventListener('click', () => {
            this.remove();
        });
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
            eventBus.emit(DropListEvents.chooseElement + this.idList, item.dataset.list);
        })
    }
}

export default new DropListComponent();
