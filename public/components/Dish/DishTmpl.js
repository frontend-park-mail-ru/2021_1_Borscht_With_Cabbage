export const renderDish = window.Handlebars.compile(`
    <div class="card__header data-dishID="{{dish.id}}">
        <div class="card__header-top">
            <span class="card__name">{{dish.name}}</span>
            <div class="card__header-icons">
                <img src="static/edit.png" class="card__header-icon icon-edit">
                <img src="static/delete.png" class="card__header-icon icon-delete">
            </div>
        </div>
        <span class="card__sum">{{dish.price}} рублей</span>
    </div>
    <span class="card__image" style="background-image: url('{{dish.image}}')"></span>
    <span class="card__description">
        {{dish.description}}
    </span>
`)
