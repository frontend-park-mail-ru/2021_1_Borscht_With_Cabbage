export const renderInfoRestaurant = window.Handlebars.compile(`
    <li class="card" data-restaurant="{{node.id}}">      
        <div class="card__header">
            <span class="card__name">{{node.title}}</span>
            <span class="card__sum">{{node.time}} &#8381; </span>
        </div>
        
        <span class="card__image" style="background-image: url(static/food.jpg)"></span>
        <span class="card__description">{{node.description}}</span>
    
        <span class="card__rating">Рейтинг: {{node.rating}}</span>
        <span>Средний чек: {{node.cost}} рублей</span>
    </li>
`);
