export const renderParams = window.Handlebars.compile(`

<div class="params-panel">
    <ul class="params-panel__slider">
        {{#each params}}
        <li class="params-panel__slide">
            <div class="params-panel__slide-name">{{this.name}}</div>
            <a href="{{ this.default.data }}" data-params="{{ this.data }}" class="panel__btn">
                <div class="params-panel__slide-btn">{{ this.default.name }}</div>
            </a>
        </li>
        {{/each}}
    </ul>
</div>

`)
