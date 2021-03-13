export const renderStoreBasket = window.Handlebars.compile(`
        <div id="store-basket">
            <h2>Корзина</h2>
            <ul id="store-basket-food_list">
            </ul>
            <h2>Итого <span id="store-basket-total">0</span> рублей</h2>
            <button id="store-basket-order" class="button-log">Оформить</button>
        </div>
`)
