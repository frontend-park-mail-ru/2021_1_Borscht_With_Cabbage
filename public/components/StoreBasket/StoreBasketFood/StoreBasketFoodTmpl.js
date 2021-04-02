export const renderStoreBasketFood = window.Handlebars.compile(`
        <li data-chosenFoodID="{{chosenDish.id}}" id="chosen_food-id-{{chosenDish.id}}">
            {{chosenDish.name}} -- {{chosenDish.price}} рублей -- <span data-chosenFoodNumID="{{chosenDish.id}}" id="chosen_food--num-id-{{chosenDish.id}}">{{num}}</span> штук
        </li>
`)
