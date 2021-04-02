export const renderParams = window.Handlebars.compile(`
<div class="params-panel">
    <ul class="params-panel__slider">
        {{#each params}}
        <li class="params-panel__slide">
            <div class="params-panel__slide-name">{{this.name}}</div>
            <a href="/{{this.data}}"><div data-params="{{this.data}}" class="params-panel__slide-btn">{{this.value}}</div></a>
        </li>
        {{/each}}
    </ul>
</div>

`)
