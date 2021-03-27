import { renderBtn } from './MoreRestaurantsTmpl.js';
import { MainController } from '../../../controllers/MainController.js'

export class MoreRestaurantsComponent {
    constructor ({
        root = document.body,
        controller = new MainController()
    } = {}) {
        this.root = root;
        this.controller = controller;
    }

    render () {
        const btnTmpl = document.createElement('div');

        btnTmpl.innerHTML = renderBtn();
        this.root.append(btnTmpl);

        this.addListeners();
    }

    addListeners () {
        const btnMore = this.root.querySelector('.more-button');
        if(!btnMore) {
            return;
        }

        btnMore.addEventListener('click', () => {
            this.controller.getRestaurants();
        })





        // const paramsPanel = this.root.querySelector('.params-panel');
        // if (!paramsPanel) {
        //     return;
        // }

        // paramsPanel.addEventListener('click', e => {
        //     const { target } = e;
        //     e.preventDefault();

        //     const item = target.closest('.panel__btn');
        //     if (!item) {
        //         return;
        //     }

        //     if (this.list) {
        //         this.list.remove();
        //     }
        //     this.list = new DropListComponent({ 
        //         root: item,
        //         content: params[item.dataset.params].val,
        //         callback: (value) => {
        //             // элемент в котором нужно поменять значение параметра
        //             item.childNodes[1].innerHTML = params[item.dataset.params]
        //                                         .val[value].name;

        //             this.controller.clickParams({ 
        //                 name: item.dataset.params,
        //                 value: value
        //             });
        //         }
        //     });

        //     this.list.add();
        // })
    }
}
