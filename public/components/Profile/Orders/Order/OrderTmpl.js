export const renderOrder = window.Handlebars.compile(`
<div class="profile-left-block-orders profile-card">
    <div class="profile-left-block-restaurant">
        <h1 class="profile-left-block-restaurant__name ">{{order.store}}</h1>
    </div>
    <div class="profile-left-block-order-date-and-address">
        <h3 class="profile-left-block-order__date profile__text-with-small-weight">{{order.orderTime}}</h3>
        <h3 class="profile-left-block-order__address profile__text-with-small-weight">{{order.address}}</h3>
    </div>

    <div class="profile-left-block-order-contents">
        <div id="profile-left-block-order-food-{{order.orderID}}" class="profile-left-block-order-contents-dishes">
        
        </div>
        
        <div class="profile-left-block-order-contents-sum">
            <div class="profile-left-block-order-contents-sum-order">
                <div class="profile-left-block-order-static-text">
                    <h3 class="profile__text-with-small-weight">Доставка</h3>
                </div>
                <h3 class="profile-left-block-order__ship profile__text-with-small-weight profile__text-with-small-weight profile-left-block-order-align-right">{{order.ship}}</h3>
            </div>
            <div class="profile-left-block-order-contents-sum-summary">
                <div class="profile-left-block-order-static-text">
                    <h2>Итого</h2>
                </div>
                <h2 class="profile-left-block-order__sum profile-left-block-order-align-right">{{order.summary}}</h2>
            </div>
        </div>
    </div>

    <div class="profile-left-block-order-state">
        <div class="profile-left-block-order-state-status">
            <div class="profile-left-block-order-static-text">
                <h3 class="profile__text-with-small-weight">Статус заказа</h3>
            </div>
            <h3 class="profile-left-block-order-state__status profile__text-with-small-weight profile-left-block-order-align-right">{{order.status}}</h3>
        </div>
        
        <div class="profile-left-block-order-delivery">
            <div class="profile-left-block-order-static-text">
                <h3 class="profile__text-with-small-weight">Ожидаемое время доставки</h3>
            </div>
            <h3 class="profile-left-block-order-status__tile profile__text-with-small-weight profile-left-block-order-align-right">{{order.deliveryTime}}</h3>
        </div>
    </div>

</div>
`)