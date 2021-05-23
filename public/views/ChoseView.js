import { noop } from 'Modules/utils.js';
import 'Components/Chose/Chose.less';
import { ChoseController } from 'Controllers/ChoseController.js';
import { ChoseComponent } from 'Components/Chose/ChoseComponent.js';
import renderChoseView from 'Components/Chose/ChoseTmpl.hbs';

export class ChoseView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new ChoseController({ root, goTo })
    }) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.choseComponent = new ChoseComponent({ goTo, controller });
    }

    render (baskets, activePage) {
        this.root.innerHTML = renderChoseView();

        const listHref = this.root.querySelector('#js__chose-list');
        const tableHref = this.root.querySelector('#js__chose-table');

        switch (activePage) {
        case 'comparison':
            tableHref.classList.add('chose_selected');
            this.choseComponent.render(this.root.querySelector('.chose__container'), baskets, false);
            break;
        case 'all':
            listHref.classList.add('chose_selected');
            this.choseComponent.render(this.root.querySelector('.chose__container'), baskets, true);
            break;
        }

        listHref.addEventListener('click', () => {
               this.goTo('/chose/all');
            });
        tableHref.addEventListener('click', () => {
                this.goTo('/chose/comparison');
            });
    }
}
