import { renderFilter } from './FilterTemplate.js';

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
       
const filter = {
    time: {
        name: 'Время доставки',
        value: 'до 180 минут',
        data: 'time'
    },
    receipt: {
        name: 'Средний чек',
        value: 'до 2000 рублей',
        data: 'receipt'
    },
    rating: {
        name: 'Рейтинг',
        value: 'неважен',
        data: 'rating'
    }
}

export class FilterComponent {
    constructor (root, categoryCallback, paramsCallback) {
        this.root = root;
        this.render = this.render.bind(this);
        this.addCategoryListeners = this.addCategoryListeners.bind(this);

        this.categoryCallback = categoryCallback;
        this.paramsCallback = paramsCallback;
        this.collectionCategory = [];
        this.params = new Map();
    }

    render () {
        const filterElem = document.createElement('div');

        filterElem.innerHTML = renderFilter({
            category: category,
            filter: filter
        });
        this.root.append(filterElem);

        this.addCategoryListeners(this.categoryCallback);
        this.addParamsListeners(this.paramsCallback);
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

    addParamsListeners(callback) {
        this.root.querySelector('.params-panel').addEventListener('click', e => {
            const {target} = e;

            e.preventDefault();

            // проверяе что нажали именно на кнопку
            // TODO выбор из предложенных параметров
            let currParams = target.dataset.params;
            if (currParams !== undefined) {

                callback(currParams, true);
            }  
        })
    }
}
