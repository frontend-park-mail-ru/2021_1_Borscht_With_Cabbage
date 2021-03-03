Handlebars.registerHelper("infoRestaurant", function(data) {
    return `
        <span class="content__header">
            <span class="content__header-name">` + data.name + `</span>
            <span class="content__header-time">` + data.time + `</span>
        </span>
        <img class="content__image" src="static/food.jpg">
        <span class="content__descript">` + data.description + `</span>
        <span class="content__info">
            <span class="content__rating">Рейтинг: ` + data.rating + `</span>
            <span class="content__receipt">Средний чек: ` + data.cost + ` рублей</span>
        </span>`;
  });
