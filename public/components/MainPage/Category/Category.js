import { renderCategory } from './CategoryTmpl.js';
import { category } from './Category.constants.js'
import { noOp } from '../../../modules/utils.js';

export class CategoryComponent {
    constructor ({
        root = document.body,
        callback = noOp
    } = {}) {
        this.root = root;

        this.callback = callback;
    }

    render () {
        const categoryElem = document.createElement('div');

        categoryElem.innerHTML = renderCategory({
            category: category
        });
        this.root.append(categoryElem);

        this.addCategoryListeners(this.callback);
    }

    addCategoryListeners (callback) {
        const cuisinesPanel = this.root.querySelector('.cuisines-panel');
        if (!cuisinesPanel) {
            return;
        }

        cuisinesPanel.addEventListener('click', e => {
            const { target } = e;

            e.preventDefault();
            // проверяе что нажали именно на кнопку
            const currCategory = target.dataset.category;
            if (currCategory) {
                // TODO меняем элемент визуально как нибудь

                callback(currCategory);
            }
        })
    }
}
