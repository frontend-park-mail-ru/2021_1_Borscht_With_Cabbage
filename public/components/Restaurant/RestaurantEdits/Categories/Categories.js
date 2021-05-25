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

    filtersToCategories (filters = []) {
        const categories = categoryDefault;
        Object.entries(categoryDefault).forEach(category => category.isSelect = false);
        for (const [_, val] of filters) {
            categories[val].isSelect = true;
        }
        return categories;
    }

    categoriesToFilters (categories = categoryDefault) {
        return Object.entries(categories).map(([name, { isSelect }]) => {
            if (isSelect) {
                return name;
            }
        });
    }

    render (root, filters) {
        const categories = this.filtersToCategories(filters);
        this.setCategories(categories);
        root.innerHTML = renderCategories({ categories });
        const categoryBlock = root.querySelectorAll('[data-name]');
        categoryBlock.forEach(div => {
            div.addEventListener('click', () => {
                this.categories[div.dataset.name].isSelect = !this.categories[div.dataset.name].isSelect;
                if (this.categories[div.dataset.name].isSelect) {
                    div.classList.add('selected');
                } else {
                    div.classList.remove('selected');
                }
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
        return this.categoriesToFilters(this.categories);
    }
}
