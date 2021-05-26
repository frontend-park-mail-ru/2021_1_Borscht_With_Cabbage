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
        for (const val of filters) {
            console.log(val)
            categories[val].isSelect = true;
        }
        return categories;
    }

    categoriesToFilters (categories = categoryDefault) {
        return Object.entries(categories).map(([name, { isSelect }]) => {
            if (isSelect) {
                return name;
            }
        }).filter(value => value);
    }

    render (root, filters) {
        const categories = this.filtersToCategories(filters);
        this.setCategories(categories);
        root.innerHTML = renderCategories({ categories });
        const categoryDiv = root.querySelectorAll('[data-categoryname]');
        categoryDiv.forEach(categoryBlock => {
            categoryBlock.addEventListener('click', () => {
                this.categories[categoryBlock.dataset.categoryname].isSelect = !this.categories[categoryBlock.dataset.categoryname].isSelect;
                if (this.categories[categoryBlock.dataset.categoryname].isSelect) {
                    categoryBlock.classList.add('selected');
                } else {
                    categoryBlock.classList.remove('selected');
                }
            });
            if (this.categories[categoryBlock.dataset.categoryname].isSelect) {
                categoryBlock.classList.add('selected');
            }
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
