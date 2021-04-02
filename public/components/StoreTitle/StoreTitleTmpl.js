export const renderStoreTitle = window.Handlebars.compile(`
    <div class="store__title__container">
        <img class="store__title__image" src="{{image}}">
        <div class="store__title__main">
            <span class="store__title__name">{{name}}</span>
            <div class="store__title__info">
                <span class="store__title__delivery-time">Время доставки: {{deliveryTime}} минут</span>
                <span class="store__title__delivery-cost">Доставка: {{deliveryCost}} рублей</span>
                <span class="store__title__rating"><img style="margin-top: -4px" src="../../../static/star_rating.svg">{{rating}}</span>
            </div>
        </div>
    </div>
`)
