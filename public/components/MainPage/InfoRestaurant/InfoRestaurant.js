export const renderInfoRestaurant = window.Handlebars.compile(`
        <li class="card" data-restaurant="{{node.id}}">      
            <div class="card__header">
                <span class="card__name">{{node.name}}</span>
                <span class="restaurant-content__header-time">{{node.time}}</span>
            
                <img class="card__image" src="static/food.jpg">
                <span class="card__description">{{node.description}}</span>
            
                <span class="card__rating">Рейтинг: {{node.rating}}</span>
                <span class="restaurant-content__receipt">Средний чек: {{node.cost}} рублей</span>
            </div>
        </li>
`);
