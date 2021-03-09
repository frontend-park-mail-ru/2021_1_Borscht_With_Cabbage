import { renderStoreView } from './storeTemplate.js';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { storeGet } from '../../modules/api.js';

export class StoreView {
    constructor (root, route) {
        this.route = route;
        this.root = root;
    }

    render (url) {
        storeGet(url)
            .then(r => this.storePageDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
    }

    storePageDraw (info, status) {
        if (status === 200) {
            this.root.innerHTML = '';
            this.navbar = new NavBar(this.root);
            const main = document.createElement('div');
            main.innerHTML = renderStoreView(info);
            this.root.append(main);
            this.info = info;

            this.addEventListeners();
        } else {
            this.route('login');
        }
    }

    addEventListeners () {
        document.getElementById('store-basket-order')
            .addEventListener('click', () => this.route('basket'));

        const buttons = document.getElementsByClassName('button-add');
        const foodList = Object.entries(this.info.foods);
        const basketList = document.getElementById('store-basket-food_list');
        const totalSum = document.getElementById('store-basket-total');
        Array
            .from(buttons)
            .forEach(function (button) {
                button.addEventListener('click', function () {
                    const buttonID = button.id.substring(button.id.indexOf('-id') + 3);
                    foodList
                        .forEach(food => {
                            const foodObj = food[1];
                            if (String(foodObj.id) === buttonID) {
                                const chosenFood = window.Handlebars
                                    .compile('{{> storeBasketElement chosenFood}}')({
                                        chosenFood: foodObj
                                    });
                                const div = document.createElement('div');
                                div.innerHTML = chosenFood;
                                basketList.append(div);
                                totalSum.textContent = String(Number(totalSum.textContent) +
                                    Number(foodObj.price));
                            }
                        });
                });
            });
    }
}
