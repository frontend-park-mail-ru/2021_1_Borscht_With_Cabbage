import { renderParams } from './ParamsTmpl.js';
import { params } from './Params.constants.js';
import { noOp } from '../../modules/utils.js';
import { DropListComponent } from '../DropList/DropList.js'

export class ParamsComponent {
    constructor ({
        root = document.body,
        callback = noOp
    } = {}) {
        this.root = root;

        this.callback = callback;
    }

    render () {
        const paramsElem = document.createElement('div');

        paramsElem.innerHTML = renderParams({
            params: params
        });
        this.root.append(paramsElem);

        this.addParamsListeners(this.callback);
    }

    addParamsListeners (callback) {
        const paramsPanel = this.root.querySelector('.params-panel');
        if (!paramsPanel) {
            return;
        }

        paramsPanel.addEventListener('click', e => {
            const { target } = e;

            e.preventDefault();

            const item = target.closest('.panel__btn');
            if (!item) {
                return;
            }

            if (this.list) {
                this.list.remove();
            }
            this.list = new DropListComponent({ 
                root: item,
                content: params[item.dataset.params].val,
                callback: (value) => {
                    // элемент в котором нужно поменять значение параметра
                    item.childNodes[1].innerHTML = params[item.dataset.params]
                                                .val[value].name;

                    callback({
                        name: item.dataset.params,
                        value: value
                    })
                }
            });

            this.list.add();
        })
    }
}
