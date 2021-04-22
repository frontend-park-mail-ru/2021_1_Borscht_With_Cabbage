import renderParams from './ParamsTmpl.hbs';
import { params } from './Params.constants.js';
import { MainController } from '../../controllers/MainController.js'
import { DropListComponent } from '../DropList/DropList.js'
import eventBus from '../../modules/eventBus.js';
import { DropListEvents } from '../../events/DropListEvents.js';
import './Params.less'

export class ParamsComponent {
    constructor ({
        root = document.body,
        controller = new MainController()
    } = {}) {
        this.root = root;
        this.controller = controller;
        this.idDropList = 'Params';
    }

    render () {
        this.root.innerHTML = renderParams({
            params: params
        });

        eventBus.on(DropListEvents.closeDropListComponent + this.idDropList, this.closeDropList.bind(this));
        eventBus.on(DropListEvents.chooseElement + this.idDropList, this.chooseElement.bind(this));
        this.addParamsListeners();
    }

    closeDropList () {
        if (this.list) {
            this.list.remove();
        }
        this.item = null;
        this.list = null;
    }

    chooseElement (name) {
        // элемент в котором нужно поменять значение параметра
        this.correctItem.innerHTML = params[this.correctItem.dataset.params]
                                    .val[name].name;

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
                this.closeDropList();
                return;
            }
            
            if (this.list) {
                this.closeDropList();
            }

            this.item = this.correctItem;
            
            this.list = new DropListComponent({ 
                root: this.correctItem,
                content: params[this.correctItem.dataset.params].val,
                idList: this.idDropList
            });

            this.list.add();
        })
    }
}
