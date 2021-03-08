export const renderPanelRestaurants = window.Handlebars.compile(`
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
