export const renderInfoRestaurant = window.Handlebars.compile(`
        <li class="content__slide" data-restaurant="{{node.id}}">      
            <div class="content__header">
                <span class="content__header-name">{{node.name}}</span>
                <span class="content__header-time">{{node.time}}</span>
            
                <img class="content__image" src="static/food.jpg">
                <span class="content__descript">{{node.description}}</span>
            
                <span class="content__rating">Рейтинг: {{node.rating}}</span>
                <span class="content__receipt">Средний чек: {{node.cost}} рублей</span>
            </div>
        </li>
`);
