export const renderFoodElement = window.Handlebars.compile(`
        <li class="card" data-foodID="{{food.id}}">
            <div class="card__header">
                <span class="card__name">{{food.name}}</span>
                <span class="card__sum">{{food.price}} рублей</span>
                <button data-foodAddButtonID="{{food.id}}" class="store-content__add-button_main"></button>
            </div>
            <img class="card__image" src="{{food.image}}" alt="{{food.image}}">
            <span class="card__description">
                {{food.description}}
            </span>
        </li>
`)