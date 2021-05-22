import { noop } from 'Modules/utils.js';
import { ChoseController } from 'Controllers/ChoseController.js';
import { ChoseComponent } from 'Components/Chose/ChoseComponent.js';

export class ChoseView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new ChoseController({ root, goTo })
    }) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.choseList = new ChoseComponent({ goTo, controller });
    }

    render (baskets, activePage) {
        switch (activePage) {
        case 'comparison':

            break;
        case 'all':
            this.choseList.render(this.root.querySelector('.chose__container'), baskets);
            break;
        }
    }
}
