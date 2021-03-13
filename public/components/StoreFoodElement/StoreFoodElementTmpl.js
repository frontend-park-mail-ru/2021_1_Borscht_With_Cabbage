export const renderFoodElement = window.Handlebars.compile(`
        <li class="content__slide" id="store-food-id{{food.id}}">
            <span class="content__header content__header-name">{{food.name}}</span>
            <img class="content__image" src="{{food.image}}" alt="{{food.image}}">
            <span class="content__descript">
                {{food.description}}
            </span>
            <span class="content__info content__receipt">Цена: {{food.price}} рублей</span>
            <button id="store-food_list-add-id{{food.id}}" class="button-log button-add">Добавить</button>
        </li>
`)
