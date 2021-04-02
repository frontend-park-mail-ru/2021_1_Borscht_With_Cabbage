export const renderCategory = window.Handlebars.compile(`
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

`)
