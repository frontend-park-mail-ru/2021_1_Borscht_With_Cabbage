export const renderOrders = window.Handlebars.compile(`
<span class="profile-left-block profile-card">
    <h1>Тут будет заказ</h1>
    <span class="profile-left-block-order__header">
    <span class="profile-left-block-order__restaurant">{{order.restaurant}}</span>
    <span class="profile-left-block-order__date">{{order.date}}</span>
    <span class="profile-left-block-order__address">{{order.address}}</span>
    <div id="profile-left-block-order-food-list"> </div> <!-- todo: сделать список еды компонент-->
    <span class="profile-left-block-order__ship">{{order.ship}}</span>
    <span class="profile-left-block-order__sum">{{order.sum}}</span>
    <span class="profile-left-block-order__status">{{order.status}}</span>
    <span class="profile-left-block-order__tile">{{order.time}}</span>
</div>
`)
