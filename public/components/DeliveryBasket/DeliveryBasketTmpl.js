export const renderDeliveryBasketHeader = Handlebars.compile(`
    <div class="delivery-basket__header">
        <img class="delivery-basket__header__image" src="{{store.image}}">
        <span class="delivery-basket__header__title">{{store.name}}</span>
    </div>
`)

export const renderDeliveryBasketBody = Handlebars.compile(`
    <div class="delivery-basket__body">
        
    </div>
`)

export const renderDeliveryBasketFooter = Handlebars.compile(`
    <div class="delivery-basket__footer">
        <div class="delivery-basket__footer__delivery">
            <span class="left-side">Доставка</span><span class="right-side">{{store.deliveryCost}}Р</span>
        </div>
        <div class="delivery-basket__footer__total">
            <span class="left-side">Итого</span><span class="right-side">{{store.totalSum}}Р</span>
        </div>
    </div>
`)
