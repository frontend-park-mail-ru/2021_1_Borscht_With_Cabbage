export const renderFoodElement = window.Handlebars.compile(`
        <li class="card" id="store-food-id{{food.id}}">
            <span class="card__header card__name">{{food.name}}</span>
            <img class="card__image" src="{{food.image}}" alt="{{food.image}}">
            <span class="card__description">
                {{food.description}}
            </span>
            <span class="card__sum">Цена: {{food.price}} рублей</span>
            <button id="dish__add-id{{food.id}}" class="button">Добавить</button>
            <div id="dish-count-buttons__id-{{food.id}}" class="food-element__add-buttons">
                <button id="dish-count-buttons__plus_{{food.id}}">+</button>
                <button id="dish-count-buttons__minus_{{food.id}}">-</button>
            </div>
        </li>
`)
