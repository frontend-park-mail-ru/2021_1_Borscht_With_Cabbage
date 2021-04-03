export const renderDropList = window.Handlebars.compile(`

    <ul class="drop-list__slider">
    {{#each content}}
    <li class="drop-list__slide">
        <a href="{{this.data}}" data-list="{{this.data}}" class="list__btn">
            <div class="list-panel__slide-btn">{{this.name}}</div>
        </a>
    </li>
    {{/each}}
    </ul>
    
`)
