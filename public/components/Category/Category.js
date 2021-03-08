import { renderCategory } from './CategoryTmpl.js';
import { category } from './Category.constants.js'

export class CategoryComponent {
    constructor ({
        root = document.body,
        callback = null
    } = {}) {
        this.root = root;

        this.callback = callback;
        this.collectionCategory = [];
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
                const index = this.collectionCategory.indexOf(currCategory);

                if (index === -1) this.collectionCategory.push(target.dataset.category);

                else this.collectionCategory.splice(index, 1);

                callback(this.collectionCategory);
            }
        })
    }
}
