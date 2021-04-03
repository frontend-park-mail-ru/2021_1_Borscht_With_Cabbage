export const renderDish = window.Handlebars.compile(`

<div class="profile-left-block_order-dish-list-photo block">
    <img src="./fdfdf.jpg" class="profile-left-block_order-dish-list-photo__image">
</div>
<div class="profile-left-block_order-dish-list block">
    <div class="profile-left-block_order-dish-list_left-block">
        <h3 class="profile-left-block-order-dishes__name profile__text-with-small-weight">{{dish.name}}</h3>
        <h3 class="profile-left-block-order-dishes__price profile__text-with-small-weight">{{dish.price}} рублей</h3>
    </div>
    
    <div class="profile-left-block_order-dish-list_right-block">
        <h3 class="profile-left-block-order-dishes__num profile__text-with-small-weight">{{dish.num}}</h3>
    </div>
</div>
`)
