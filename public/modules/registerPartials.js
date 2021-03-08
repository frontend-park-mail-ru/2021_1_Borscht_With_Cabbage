function registerNavBarComponents () {
    window.Handlebars.registerPartial('authBlock', `
        <a class="navbar-auth_user_block" href="/profile">
            <img src="{{this.avatar}}" class="navbar-avatar" alt="ava">
            <div class="navbar-username">
                {{this.email}}
            </div>
        </a>
    `);
}

function registerStoreComponents () {
    window.Handlebars.registerPartial('foodComponent', `
        <li class="content__slide" id="store-food-id{{this.id}}">
            <span class="content__header content__header-name">{{this.name}}</span>
            <img class="content__image" src="{{this.img}}" alt="{{this.img}}">
            <span class="content__descript">
                {{this.description}}
            </span>
            <span class="content__info content__receipt">Цена: {{this.cost}} рублей</span>
            <button id="store-food_list-add-id{{this.id}}" class="button-log button-add">Добавить</button>
        </li>
    `);

    window.Handlebars.registerPartial('storeTitle', `
        <h2>{{this}}</h2>
    `);

    window.Handlebars.registerPartial('foodList', `
        <div class="content">
            <ul class="content__slider">
                {{#each food}}
                    {{> foodComponent this }}
                {{/each}}
            </ul>
        </div>
    `);

    window.Handlebars.registerPartial('storeBasket', `
        <div id="store-basket">
            <h2>Корзина</h2>
            <ul id="store-basket-food_list">
            </ul>
            <h2>Итого <span id="store-basket-total">0</span> рублей</h2>
            <button id="store-basket-order" class="button-log">Оформить</button>
        </div>
    `);

    window.Handlebars.registerPartial('storeBasketElement', `
        <li>
            {{this.name}} -- {{this.cost}} рублей
        </li>
    `);
}

export function registerPartials () {
    registerNavBarComponents();
    registerStoreComponents();
}