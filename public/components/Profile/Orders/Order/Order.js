import renderOrder from './OrderTmpl.hbs';
import renderDishesList from './OrderDish/DishList.hbs';
import renderDish from './OrderDish/DishTmpl.hbs';
import { OrderReview } from './OrderReview/OrderReview.js';
import { ProfileController } from '../../../../controllers/ProfileController.js';
import { I18n } from "../../../../modules/intlApi.js";
import { noop } from '../../../../modules/utils.js';

export class OrderElement {
    constructor ({
        root = document.body,
        order = null,
        controller = new ProfileController(),
        goTo = noop
    } = {}) {
        this.root = root;
        this.order = order;
        this.controller = controller;
        this.goTo = goTo;
    }

    render () {
        if (this.order) {
            const orderWithDateTime = {}; // новый пустой объект, чтобы с изменением дат не менялась изначальная структура
            Object.keys(this.order).forEach((key) => {
                orderWithDateTime[key] = this.order[key];
            });

            const i18n = new I18n();
            orderWithDateTime.orderTime = i18n.formatDateTime(
                orderWithDateTime.orderTime
            );
            orderWithDateTime.deliveryTime = i18n.formatDateTime(
                orderWithDateTime.deliveryTime
            );
            switch (this.order.status) {
            case 'created':
                orderWithDateTime.status = 'Ожидайте подтверждения рестораном';
                break;
            case 'cooking':
                orderWithDateTime.status = 'Готовится';
                break;
            case 'delivering':
                orderWithDateTime.status = 'Едет к вам';
                break;
            case 'done':
                orderWithDateTime.status = 'Оформлен';
                orderWithDateTime.deliveryTime = 'Доставлен';
                break;
            }

            this.root.insertAdjacentHTML(
                'beforeend',
                renderOrder({ order: orderWithDateTime })
            );
            const dishesList = document.getElementById(
                'block-order-food-' + this.order.orderID
            );
            if (dishesList) {
                dishesList.innerHTML = renderDishesList({ id: this.order.orderID });
            }
            const dishPlace = document.getElementById(
                'food-list-' + this.order.orderID
            );
            if (dishPlace) {
                for (const dish of this.order.foods) {
                    dishPlace.innerHTML += renderDish({ dish: dish });
                }
            }

            if (this.order.status === 'done') {
                const review = new OrderReview({
                    root: this.root,
                    order: this.order,
                    controller: this.controller
                });
                review.render();
            }
        }

        this.root
            .querySelector('#js_go-to-chat')
            .addEventListener('click', () => {
                this.goTo(`/profile/chats/${this.order.restaurant}`);
            });
    }
}
