export const renderDish = window.Handlebars.compile(`
    <li class="card" data-dishID="{{dish.id}}">
        <div class="card__header">
            <div class="card__header-top">
                <span class="card__name">{{dish.name}}</span>
                <div class="card__header-icons">
                    <a href="#" class="icon-edit"><img src="static/edit.png" class="card__header-icon"></a>
                    <a href="#"><img src="static/delete.png" class="card__header-icon"></a>
                </div>
            </div>
            <span class="card__sum">{{dish.price}} рублей</span>
        </div>
        <span class="card__image" style="background-image: url('{{dish.image}}')"></span>
        <span class="card__description">
            {{dish.description}}
        </span>
    </li>
`)
