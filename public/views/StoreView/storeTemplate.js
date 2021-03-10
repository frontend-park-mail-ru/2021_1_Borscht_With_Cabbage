export const renderStoreView = window.Handlebars.compile(`
    <div id="store-container">
        <div id="store-main">
            <div id="store-title"></div>
            <div id="food-list"></div>
        </div>

        <div id="store-basket"></div>
    </div>
`)

export const renderFoodElement = window.Handlebars.compile(`
        <li class="content__slide" id="store-food-id{{this.id}}">
            <span class="content__header content__header-name">{{this.name}}</span>
            <img class="content__image" src="{{this.image}}" alt="{{this.image}}">
            <span class="content__descript">
                {{this.description}}
            </span>
            <span class="content__info content__receipt">Цена: {{this.price}} рублей</span>
            <button id="store-food_list-add-id{{this.id}}" class="button-log button-add">Добавить</button>
        </li>
`)

export const renderStoreTitle = window.Handlebars.compile(`
        <h2>{{this}}</h2>
`)

export const renderFoodList = window.Handlebars.compile(`
        <div class="content">
            <ul class="content__slider">
            </ul>
        </div>
`)

export const renderStoreBasket = window.Handlebars.compile(`
        <div id="store-basket">
            <h2>Корзина</h2>
            <ul id="store-basket-food_list">
            </ul>
            <h2>Итого <span id="store-basket-total">0</span> рублей</h2>
            <button id="store-basket-order" class="button-log">Оформить</button>
        </div>
`)

export const renderStoreBasketFood = window.Handlebars.compile(`
        <li>
            {{chosenDish.name}} -- {{chosenDish.price}} рублей
        </li>
`)

