export const renderDish = window.Handlebars.compile(`
<h1>блюдо</h1>
    <span class="profile-left-block-order-dishes__name">{{dish.name}}</span>
    <span class="profile-left-block-order-dishes__price">{{dish.price}} рублей</span>
<!--    <span class="profile-left-block-order-dishes__num">{{dish.num}</span>-->
`)
