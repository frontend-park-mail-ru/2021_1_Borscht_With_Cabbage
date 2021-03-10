import { renderFilter } from './FilterTmpl.js';

export class FilterComponent {
    constructor ({
        root = document.body
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
