export const renderDish = window.Handlebars.compile(`
    <li class="card" data-dishID="{{dish.id}}">
        <div class="card__header">
            <span class="card__name">{{dish.name}}</span>
            <span class="card__sum">{{dish.price}} рублей</span>
        </div>
        <img class="card__image" src="{{dish.image}}" alt="{{dish.image}}">
        <span class="card__description">
            {{dish.description}}
        </span>
    </li>
`)
