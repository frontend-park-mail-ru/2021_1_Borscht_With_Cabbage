import './Categories.less';
import renderCategories from './CategoriesTmpl.hbs';

const categoryDefault = {
    sushi: {
        isSelect: false,
        name: 'sushi',
        text: 'Суши'
    },
    pizza: {
        isSelect: false,
        name: 'pizza',
        text: 'Пицца'
    },
    burgers: {
        isSelect: false,
        name: 'burgers',
        text: 'Бургеры'
    },
    meat: {
        isSelect: false,
        name: 'meat',
        text: 'Мясо'
    },
    fast_food: {
        isSelect: false,
        name: 'fast_food',
        text: 'Фастфуд'
    },
    zosh: {
        isSelect: false,
        name: 'zosh',
        text: 'Здоровая еда'
    }
}

export class Categories {
    constructor () {
        this.categories = categoryDefault;
    }

    render (root, categories = categoryDefault) {
        this.setCategories(categories);
        root.innerHTML = renderCategories({ categories });
        const categoryDivs = root.querySelectorAll('[data-name]');
        categoryDivs.forEach(div => {
            div.addEventListener('click', () => {
                this.categories[div.dataset.name].isSelect = !this.categories[div.dataset.name].isSelect;
            });
        });
    }

    setCategories (categories = categoryDefault) {
        Object
            .entries(categories)
            .forEach(([category, { isSelect }]) => {
                this.categories[category].isSelect = isSelect;
            });
    }

    getCategories () {
        return this.categories;
    }
}
