export const renderDeliveryOptions = Handlebars.compile(`
    <h3 class="delivery-options__title">Доставка</h3>
    <div class="delivery-options__container">
        <input id="input-address" value="{{ user.address }}">
        <input id="input-number"  value="{{ user.number  }}">
        <input id="input-comments">
        <button id="button-order" class="button">Заказать</button>
    </div>
`);
