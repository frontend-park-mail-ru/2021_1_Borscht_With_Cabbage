import { renderFilter } from './FilterTmpl.js';
import { noOp } from '../../modules/utils.js';

export class FilterComponent {
    constructor ({
        root = document.body,
        callback = noOp
    } = {}) {
        this.root = root;
    }

    // TODO компонент только рисуется, надо сделать выпадающее меню, и логику отправки на сервер
    // но это не к первому рк
    render () {
        const filterElem = document.createElement('div');

        filterElem.innerHTML = renderFilter({});
        this.root.append(filterElem);
    }
}
