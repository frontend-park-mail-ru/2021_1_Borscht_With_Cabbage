export const renderStoreBasketFood = window.Handlebars.compile(`
        <li data-chosenFoodID="{{chosenDish.id}}">
            <div class="store__basket__food__container">
                <img src="{{chosenDish.image}}" class="store__basket__food__image"/>
                {{chosenDish.name}} -- {{chosenDish.price}} рублей -- <span data-chosenFoodNumID="{{chosenDish.id}}">{{num}}</span> штук
            </div>
       </li>
`)
