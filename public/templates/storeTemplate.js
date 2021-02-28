//TODO filter, styles
//TODO
export const renderStoreView = Handlebars.compile(`
<div id="store-container">
    <div id="store-main">

        <h2>{{this.title}}</h2>

        <div class="content">
            <ul class="content__slider">
                {{#each food}}
                <li class="content__slide">
                    <span class="content__header content__header-name">{{this.name}}</span>
                    <img class="content__image" src="{{this.img}}" alt="{{this.img}}">
                    <span class="content__descript">
                        {{this.description}}
                    </span>
                    <span class="content__info content__receipt">Цена: {{this.cost}} рублей</span>
                </li>
                {{/each}}
            </ul>
        </div>

    </div>

    <div id="store-right_block">
        <h2>Корзина</h2>

        <ul>
            {{#each chosen_food}}
            <li>{{this}}</li>
            {{/each}}
        </ul>

        <h2>Итого {{this.sum}}</h2>
    </div>

</div>
`)