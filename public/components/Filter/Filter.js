import renderFilter from './FilterTmpl.hbs';
import { noop } from 'Modules/utils.js';

export class FilterComponent {
    constructor ({
        root = document.body,
        callback = noop
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
