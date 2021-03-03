Handlebars.registerHelper("infoRestaurant", function({
    name,
    time,
    description,
    rating,
    cost,
}) {
    return `
        <span class="content__header">
            <span class="content__header-name">` + name + `</span>
            <span class="content__header-time">` + time + `</span>
        </span>
        <img class="content__image" src="static/food.jpg">
        <span class="content__descript">` + description + `</span>
        <span class="content__info">
            <span class="content__rating">Рейтинг: ` + rating + `</span>
            <span class="content__receipt">Средний чек: ` + cost + ` рублей</span>
        </span>`;
  });
