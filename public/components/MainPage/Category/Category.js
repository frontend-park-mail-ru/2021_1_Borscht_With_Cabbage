import { renderCategory } from './CategoryTmpl.js';
import { category } from './Category.constants.js'
import { MainController } from '../../../controllers/MainController.js'

export class CategoryComponent {
    constructor ({
        root = document.body,
        controller = new MainController()
    } = {}) {
        this.root = root;
        this.controller = controller;
    }

    render () {
        const categoryElem = document.createElement('div');

        categoryElem.innerHTML = renderCategory({
            category: category
        });
        this.root.append(categoryElem);

        this.addCategoryListeners();
    }

    addCategoryListeners () {
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

                this.controller.clickCategory({ name: currCategory });
            }
        })
    }
}
