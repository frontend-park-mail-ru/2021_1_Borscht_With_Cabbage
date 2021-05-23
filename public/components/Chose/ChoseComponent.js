import './Chose.less';
import './ChoseList/ChoseList.less';
import './ChoseTable/ChoseTable.less';
import renderChoseList from './ChoseList/ChoseListTmpl.hbs';
import renderChoseTable from './ChoseTable/ChoseTableTmpl.hbs';
import { noop } from 'Modules/utils';
import { ChoseController } from 'Controllers/ChoseController';

export class ChoseComponent {
    constructor ({
        goTo = noop,
        controller = new ChoseController({ goTo })
    }) {
        this.goTo = goTo;
        this.controller = controller;
    }

    render (root, baskets, isList) {
        this.root = root;
        if (isList) {
            this.root.innerHTML = renderChoseList({ baskets });
        } else {
            this.root.innerHTML = renderChoseTable({ baskets });
        }

        const deleteButtons = this.root.querySelectorAll('[data-button="delete"]');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.controller.deleteBasket(button.dataset.id);
                this.root.querySelector(`#chose-list__basket${button.dataset.id}`)?.remove();
            });
        });

        const orderButtons = this.root.querySelectorAll('[data-button="order"]');
        orderButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.controller.orderBasket(button.dataset.id);
            });
        });

        const storeButtons = this.root.querySelectorAll('[data-button="store"]');
        storeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.controller.goStore(button.dataset.id);
            });
        });
    }
}