export const renderStoreBasketFood = window.Handlebars.compile(`
        <li>
            {{chosenDish.name}} -- {{chosenDish.price}} рублей
        </li>
`)
