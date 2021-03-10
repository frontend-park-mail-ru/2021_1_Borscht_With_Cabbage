window.Handlebars.registerHelper('infoRestaurant', function ({
    id,
    name,
    time,
    description,
    rating,
    cost
}) {
    return `
        <a href="/${id}" class="content__header">
            <span class="content__header-name">${name}</span>
            <span class="content__header-time">${time}</span>
        
            <img class="content__image" src="static/food.jpg">
            <span class="content__descript">${description}</span>
        
            <span class="content__rating">Рейтинг: ${rating}</span>
            <span class="content__receipt">Средний чек: ${cost} рублей</span>
        </a>`;
});
