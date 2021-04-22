import renderCategory from './CategoryTmpl.hbs';
import { category } from './Category.constants.js'
import { MainController } from '../../controllers/MainController.js'
import { DropListComponent } from '../DropList/DropList.js'
import eventBus from '../../modules/eventBus.js';
import { DropListEvents } from '../../events/DropListEvents.js';
import './Category.less'

export class CategoryComponent {
    constructor ({
        root = document.body,
        controller = new MainController()
    } = {}) {
        this.root = root;
        this.controller = controller;
        this.idDropList = 'Category';
    }

    render () {
        this.root.innerHTML = renderCategory({
            category: category
        });
        this.elemCategory = this.root.getElementsByClassName('cuisines-panel__slide');
        this.numberCategory = this.elemCategory.length - 1;
        this.numberVisability = 0;

        eventBus.on(DropListEvents.closeDropListComponent + this.idDropList, this.closeDropList.bind(this));
        eventBus.on(DropListEvents.chooseElement + this.idDropList, this.chooseElement.bind(this));
        this.addCategoryListeners();
        this.addSizeListener();
    }

    closeDropList() {
        this.list.remove();
        this.list = null;
    }

    chooseElement(name) {
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
                if (!this.list) {
                    this.dropList(target);
                } else {
                    this.closeDropList();
                }
            }
            else if (currCategory) {
                // TODO меняем элемент визуально как нибудь

                this.controller.clickCategory(currCategory);
            }
        })
    }

    dropList(item) {
        const itemList = [];
        for (let i = this.numberVisability; i < this.numberCategory; i++) {
            const itemBody = {
                name: this.elemCategory[i].textContent,
                data: this.elemCategory[i].dataset.category
            }
            itemList.push(itemBody);
        }
        this.list = new DropListComponent({ 
            root: item,
            content: itemList,
            idList: this.idDropList
        });

        this.list.add();
    }

    addSizeListener () {
        const moreItem = this.root.querySelector('.cuisines-panel__slide-more');
        if (moreItem && getComputedStyle(moreItem).display !== 'none') {
            const offsetRight = moreItem.offsetParent.offsetWidth - moreItem.offsetLeft - moreItem.offsetWidth;
            if(120 >= moreItem.offsetWidth) {
                const item = this.elemCategory[this.numberVisability - 1];
                if (item) {
                    this.numberVisability--;
                    item.classList.add('cuisines-panel__slide--is-hidden');
                }
            }

            else if(240 <= offsetRight && this.numberCategory !== this.numberVisability) {
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
