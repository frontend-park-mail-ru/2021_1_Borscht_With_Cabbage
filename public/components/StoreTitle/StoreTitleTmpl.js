export const renderStoreTitle = window.Handlebars.compile(`
    <div class="store-title__container">
        <img class="store-title__image" src="{{image}}">
        <div class="store-title__main">
            <span class="store-title__name">{{name}}</span>
            <div class="store-title__info">
                <span class="store-title__delivery-time">Время доставки: {{deliveryTime}} минут</span>
                <span class="store-title__delivery-cost">Доставка: {{deliveryCost}} рублей</span>
                <span class="store-title__rating"><img style="margin-top: -4px" src="../../../static/star_rating.svg">{{rating}}</span>
            </div>
        </div>
    </div>
`)
