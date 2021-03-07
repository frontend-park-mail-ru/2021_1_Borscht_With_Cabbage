import { renderParams } from './ParamsTmpl.js';
       
const params = {
    time: {
        name: 'Время доставки',
        value: 'до 180 минут',
        data: 'time'
    },
    receipt: {
        name: 'Средний чек',
        value: 'до 2000 рублей',
        data: 'receipt'
    },
    rating: {
        name: 'Рейтинг',
        value: 'неважен',
        data: 'rating'
    }
}

export class ParamsComponent {
    constructor (root, paramsCallback) {
        this.root = root;
        this.render = this.render.bind(this);

        this.paramsCallback = paramsCallback;
        this.params = new Map();
    }

    render () {
        const paramsElem = document.createElement('div');

        paramsElem.innerHTML = renderParams({
            params: params
        });
        this.root.append(paramsElem);

        this.addParamsListeners(this.paramsCallback);
    }

    // TODO компонент только рисуется, вся логика не к первому рк
    // при нажатии стоит заглушка
    addParamsListeners(callback) {
        this.root.querySelector('.params-panel').addEventListener('click', e => {
            const {target} = e;

            e.preventDefault();

            // проверяе что нажали именно на кнопку
            // TODO выбор из предложенных параметров
            let currParams = target.dataset.params;
            if (currParams !== undefined) {

                callback(currParams, true);
            }  
        })
    }
}
