export const renderMainView = window.Handlebars.compile(`
<div class="cuisines-panel cuisines-panel__container">
    <ul class="cuisines-panel__slider">
        {{#each category}}
        <li name="{{this.name}}" class="cuisines-panel__slide">
            <a href="/{{this.name}}" class="cuisines-panel__slide-btn">
                {{this.text}}
            </a>
        </li>
        {{/each}}
    </ul>
</div>

<div class="params-panel">
    <ul class="params-panel__slider">
        {{#each filter}}
        <li class="params-panel__slide">
            <div class="params-panel__slide-name">{{this.name}}</div>
            <div class="params-panel__slide-btn"><a href="#">{{this.value}}</a></div>
        </li>
        {{/each}}
    </ul>
</div>

<div class="filter-panel">
    <img src="" alt="">
    <span class="filter-panel__text">Сортировать по</span>
    <span class="filter-panel__info"><a href="#">СРЕДНЕМУ ЧЕКУ</a></span>
</div>

<div class="content">
    <ul class="content__slider">
        {{#each store}}
        <li class="content__slide">
            {{{ infoRestaurant this }}}
        </li>
        {{/each}}
    </ul>
</div>
`)