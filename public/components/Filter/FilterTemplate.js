export const renderFilter = window.Handlebars.compile(`
<div class="cuisines-panel cuisines-panel__container">
    <ul class="cuisines-panel__slider">
        {{#each category}}
            <a href="/{{this.name}}" class="cuisines-panel__slide-btn">
                <li data-category="{{this.name}}" class="cuisines-panel__slide">
                {{this.text}}
                </li>
            </a>
        {{/each}}
    </ul>
</div>

<div class="params-panel">
    <ul class="params-panel__slider">
        {{#each filter}}
        <li class="params-panel__slide">
            <div class="params-panel__slide-name">{{this.name}}</div>
            <a href="/{{this.data}}"><div data-params="{{this.data}}" class="params-panel__slide-btn">{{this.value}}</div></a>
        </li>
        {{/each}}
    </ul>
</div>

<div class="filter-panel">
    <img src="" alt="">
    <span class="filter-panel__text">Сортировать по</span>
    <span class="filter-panel__info"><a href="/">СРЕДНЕМУ ЧЕКУ</a></span>
</div>
`)