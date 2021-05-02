import './Params.less';
import renderParams from './ParamsTmpl.hbs';
import { params } from './Params.constants.js';
import { MainController } from '../../controllers/MainController.js'
import list from '../DropList/DropList.js'
import eventBus from '../../modules/eventBus.js';
import { DropListEvents } from '../../events/DropListEvents.js';

export class ParamsComponent {
    constructor ({
        controller = new MainController()
    } = {}) {
        this.controller = controller;
        this.idDropList = 'Params';

        eventBus.on(DropListEvents.chooseElement + this.idDropList, this.chooseElement.bind(this));
    }

    render ({
        root = document.body
    } = {}) {
        this.root = root;
        this.root.innerHTML = renderParams({
            params: params
        });

        this.addParamsListeners();
    }

    chooseElement (name) {
        // элемент в котором нужно поменять значение параметра
        console.log(name);
        this.correctItem.innerHTML = params[this.correctItem.dataset.params]
            .val[name].name;
        this.item = null;

        this.controller.clickParams({
            name: this.correctItem.dataset.params,
            value: name
        });
    }

    addParamsListeners () {
        const paramsPanel = this.root.querySelector('.params-panel');
        if (!paramsPanel) {
            return;
        }

        paramsPanel.addEventListener('click', e => {
            const { target } = e;
            e.preventDefault();

            this.correctItem = target.closest('.panel__btn');
            if (!this.correctItem) {
                return;
            }

            // убираем список при повторном нажатии
            if (this.item === this.correctItem) {
                list.remove();
                this.item = null;
                return;
            }

            this.item = this.correctItem;

            list.render({
                root: this.correctItem,
                content: params[this.correctItem.dataset.params].val,
                idList: this.idDropList
            });
        })
    }
}
