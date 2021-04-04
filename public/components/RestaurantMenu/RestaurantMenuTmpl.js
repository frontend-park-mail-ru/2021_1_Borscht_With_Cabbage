export const renderRestaurantMenu = window.Handlebars.compile(`

<div class="menu">
    <div class="menu-container">
        <h2 class="menu-container__title">Меню</h2>
        <ul class="menu-container__content horizontal-list"></ul>
        <button class="menu-container__add-dish">+ Добавить блюдо</button>
    </div>
</div>

`)
