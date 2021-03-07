import { renderCategory } from './CategoryTmpl.js';

const category = {
    sushi: {
        name: 'sushi',
        text: 'Суши',
    },
    pizza: {
        name: 'pizza',
        text: 'Пицца'
    },
    burgers: {
        name: 'burgers',
        text: 'Бургеры'
    },
    meat: {
        name: 'meat',
        text: 'Мясо'
    },
    fast_food: {
        name: 'fast_food',
        text: 'Фастфуд'
    },
    zosh: {
        name: 'zosh',
        text: 'Здоровая еда'
    }
}

export class CategoryComponent {
    constructor (root, categoryCallback) {
        this.root = root;
        this.render = this.render.bind(this);
        this.addCategoryListeners = this.addCategoryListeners.bind(this);

        this.categoryCallback = categoryCallback;
        this.collectionCategory = [];
    }

    render () {
        const categoryElem = document.createElement('div');

        categoryElem.innerHTML = renderCategory({
            category: category
        });
        this.root.append(categoryElem);

        this.addCategoryListeners(this.categoryCallback);
    }

    addCategoryListeners(callback) {
        this.root.querySelector('.cuisines-panel').addEventListener('click', e => {
            const {target} = e;

            e.preventDefault();
        
            // проверяе что нажали именно на кнопку
            let currCategory = target.dataset.category;
            if (currCategory !== undefined) {
                let index = this.collectionCategory.indexOf(currCategory);

                if (index == -1)
                    this.collectionCategory.push(target.dataset.category);

                else
                    this.collectionCategory.splice(index, 1);

                callback(this.collectionCategory);
            } 
        })
    }
}
