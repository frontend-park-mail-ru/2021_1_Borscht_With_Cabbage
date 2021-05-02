import './Category.less';
import renderCategory from './CategoryTmpl.hbs';
import { category } from './Category.constants.js'
import { MainController } from '../../controllers/MainController.js'
import list from '../DropList/DropList.js'
import eventBus from '../../modules/eventBus.js';
import { DropListEvents } from '../../events/DropListEvents.js';

export class CategoryComponent {
    constructor ({
        controller = new MainController()
    } = {}) {
        this.controller = controller;
        this.idDropList = 'Category';

        eventBus.on(DropListEvents.chooseElement + this.idDropList, this.chooseElement.bind(this));
    }

    render ({
        root = document.body
    } = {}) {
        this.root = root;
        this.root.innerHTML = renderCategory({
            category: category
        });
        this.elemCategory = this.root.getElementsByClassName('cuisines-panel__slide');
        this.numberCategory = this.elemCategory.length - 1;
        this.numberVisability = 0;

        this.addCategoryListeners();
        this.addSizeListener();
    }

    chooseElement (name) {
        const target = this.root.querySelector(`[data-category="${name}"`);
        this.correctStyle(target);
        console.log(target);
        this.controller.clickCategory({ name: name });
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
            if (currCategory === 'more') {
                this.dropList(target);
            } else if (currCategory) {
                this.correctStyle(target);

                this.controller.clickCategory({ name: currCategory });
            }
        })
    }

    correctStyle (target) {
        const currCategory = target.dataset.category;
        category[currCategory].isSelect = !category[currCategory].isSelect;
        if (category[currCategory].isSelect) {
            target.style.backgroundColor = 'var(--main-green_color)';
            target.style.color = 'var(--navbar-href-white_color)';
        } else {
            target.style.backgroundColor = 'var(--cuisines-panel__slide_color)';
            target.style.color = 'black';
        }
    }

    dropList (item) {
        const itemList = [];
        for (let i = this.numberVisability; i < this.numberCategory; i++) {
            const itemBody = {
                name: this.elemCategory[i].textContent,
                data: this.elemCategory[i].dataset.category
            }
            itemList.push(itemBody);
        }

        list.render({
            idList: this.idDropList,
            root: item,
            content: itemList
        });
    }

    addSizeListener () {
        const moreItem = this.root.querySelector('.cuisines-panel__slide-more');
        if (moreItem && getComputedStyle(moreItem).display !== 'none') {
            const offsetRight = moreItem.offsetParent.offsetWidth - moreItem.offsetLeft - moreItem.offsetWidth;
            if (moreItem.offsetWidth <= 120) {
                const item = this.elemCategory[this.numberVisability - 1];
                if (item) {
                    this.numberVisability--;
                    item.classList.add('cuisines-panel__slide--is-hidden');
                }
            } else if (offsetRight >= 240 && this.numberCategory !== this.numberVisability) {
                this.numberVisability++;
                const item = this.elemCategory[this.numberVisability - 1];
                if (item) {
                    item.classList.remove('cuisines-panel__slide--is-hidden');
                }
            }
        }

        const replase = this.addSizeListener.bind(this);
        window.setTimeout(replase, 10);
    }
}
