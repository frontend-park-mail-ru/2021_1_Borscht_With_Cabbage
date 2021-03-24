export const renderFoodElement = window.Handlebars.compile(`
        <li class="card" data-foodID="{{food.id}}">
            <span class="card__header card__name">{{food.name}}</span>
            <img class="card__image" src="{{food.image}}" alt="{{food.image}}">
            <span class="card__description">
                {{food.description}}
            </span>
            <span class="card__sum">Цена: {{food.price}} рублей</span>
            <button data-foodAddButtonID="{{food.id}}" class="button">Добавить</button>
            <div data-foodNumID="{{food.id}}" class="restaurant-content__add-buttons">
                <button data-foodPlusButtonID="{{food.id}}">+</button>
                <button data-foodMinusButtonID="{{food.id}}">-</button>
            </div>
        </li>
`)
