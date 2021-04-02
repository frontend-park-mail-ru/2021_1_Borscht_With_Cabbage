export const renderStoreBasketFood = window.Handlebars.compile(`
    <div class="store__basket__food__container" data-chosenFoodID="{{chosenDish.id}}">
        <img src="{{chosenDish.image}}" class="store__basket__food__image"/>
        <div class="store__basket__food__main-info">
            <span class="store__basket__food__name">{{chosenDish.name}}</span>
            <span class="store__basket__food__price">{{chosenDish.price}} рублей</span>
        </div>
        <button class="store__basket__food__num" data-chosenFoodNumID="{{chosenDish.id}}">{{num}}</button>
    </div>
`)
