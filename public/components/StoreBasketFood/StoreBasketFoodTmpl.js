export const renderStoreBasketFood = window.Handlebars.compile(`
        <li id="chosen_food-id-{{chosenDish.id}}">
            {{chosenDish.name}} -- {{chosenDish.price}} рублей -- <span id="chosen_food--num-id-{{chosenDish.id}}">{{num}}</span> штук
        </li>
`)
