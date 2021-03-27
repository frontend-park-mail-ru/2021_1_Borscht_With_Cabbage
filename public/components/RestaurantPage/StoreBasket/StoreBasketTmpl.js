export const renderStoreBasket = window.Handlebars.compile(`
        <div id="restaurant-basket" class="store__basket">
            <h2 style="text-align: center">Корзина</h2>
            <div id="restaurant-basket__items">
            </div>
            <h3 class="store__basket__info" id="store__basket__delivery">Доставка <span class="store__basket__total">{{deliveryCost}} рублей</span></h3>
            <h2 class="store__basket__info">Итого <span class="store__basket__total"><span id="restaurant-basket__sum">{{deliveryCost}}</span> рублей</span></h2>
            <button id="restaurant-basket__order" class="button store__basket__total">Оформить</button>
        </div>
`)
