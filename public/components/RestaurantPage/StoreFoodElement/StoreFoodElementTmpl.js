export const renderFoodElement = window.Handlebars.compile(`
        <li class="card" data-foodID="{{food.id}}">
            <div class="card__header">
                <span class="card__name">{{food.name}}</span>
                <span class="card__sum">{{food.price}} рублей</span>
                <button data-foodAddButtonID="{{food.id}}" class="restaurant-content__add-button_main"></button>
                <div data-foodNumID="{{food.id}}" class="restaurant-content__add-buttons">
                    <button class="minus" data-foodMinusButtonID="{{food.id}}">-</button>
                    <button class="num" data-foodNumButtonID="{{food.id}}"></button>
                    <button class="plus" data-foodPlusButtonID="{{food.id}}">+</button>
                </div>
            </div>
            <img class="card__image" src="{{food.image}}" alt="{{food.image}}">
            <span class="card__description">
                {{food.description}}
            </span>
        </li>
`)
