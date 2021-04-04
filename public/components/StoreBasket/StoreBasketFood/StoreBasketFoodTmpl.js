export const renderStoreBasketFood = window.Handlebars.compile(`
    <div class="store-basket__food-container" data-chosenFoodID="{{chosenDish.id}}">
        <img src="{{chosenDish.image}}" class="store-basket__food-image"/>
        <div class="store-basket__food__main-info">
            <span class="store-basket__food-name">{{chosenDish.name}}</span>
            <span class="store-basket__food-price">{{chosenDish.price}} рублей</span>
        </div>
        <button class="store-basket__food-num" data-chosenFoodNumID="{{chosenDish.id}}">{{num}}</button>
    </div>
`)
