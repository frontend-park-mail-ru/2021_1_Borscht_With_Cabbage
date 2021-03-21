import { renderParams } from './ParamsTmpl.js';
import { params } from './Params.constants.js';
import { noOp } from '../../../modules/utils.js';

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

    // TODO компонент только рисуется, вся логика не к первому рк
    // при нажатии стоит заглушка
    addParamsListeners (err, callback) {
        const paramsPanel = this.root.querySelector('.params-panel');
        if (!paramsPanel || err) {
            return;
        }

        paramsPanel.addEventListener('click', e => {
            const { target } = e;

            e.preventDefault();

            // проверяе что нажали именно на кнопку
            // TODO выбор из предложенных параметров
            const currParams = target.dataset.params;
            if (currParams) {
                callback(null, {
                    params: currParams,
                    value: true
                });
            }
        })
    }
}
