export const renderStoreBasket = window.Handlebars.compile(`
        <div id="restaurant-basket">
            <h2>Корзина</h2>
            <ul id="restaurant-basket__items">
            </ul>
            <h2>Итого <span id="restaurant-basket__sum">0</span> рублей</h2>
            <button id="restaurant-basket__order" class="button">Оформить</button>
        </div>
`)
