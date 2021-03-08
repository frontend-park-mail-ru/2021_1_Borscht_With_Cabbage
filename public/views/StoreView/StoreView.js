import { ajaxGet } from '../../modules/http.js';
import { renderStoreView } from './storeTemplate.js';
import { navbar } from '../../components/NavBar/NavBar.js';

export class StoreView {
    constructor (root, router) {
        this.router = router;
        this.root = root;
        this.render = this.render.bind(this);
        this.storePageDraw = this.storePageDraw.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
    }

    render () {
        ajaxGet({ url: '/store' })
            .then(r => this.storePageDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
    }

    storePageDraw (info) {
        this.root.innerHTML = '';
        navbar(this.root);
        const main = document.createElement('div');
        main.innerHTML = renderStoreView(info);
        this.root.append(main);
        this.info = info;

        this.addEventListeners();
    }

    addEventListeners () {
        document.getElementById('store-basket-order')
            .addEventListener('click', () => this.router.open('/basket'));

        const buttons = document.getElementsByClassName('button-add');
        const foodList = Object.entries(this.info.food);
        const basketList = document.getElementById('store-basket-food_list');
        const totalSum = document.getElementById('store-basket-total');
        Array
            .from(buttons)
            .forEach(function (button) {
                button.addEventListener('click', function () {
                    const buttonID = button.id.substring(button.id.indexOf('-id') + 3);
                    foodList
                        .forEach(food => {
                            const foodObj = food['1'];
                            if (foodObj.id === buttonID) {
                                const chosenFood = window.Handlebars
                                    .compile('{{> storeBasketElement food}}')({
                                        food: foodObj
                                    });
                                const div = document.createElement('div');
                                div.innerHTML = chosenFood;
                                basketList.append(div);
                                totalSum.textContent = String(Number(totalSum.textContent) +
                                    Number(foodObj.cost));
                            }
                        });
                });
            });
    }
}
