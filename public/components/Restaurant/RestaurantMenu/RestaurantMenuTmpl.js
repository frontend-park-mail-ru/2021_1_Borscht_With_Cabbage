export const renderRestaurantMenu = window.Handlebars.compile(`

<div class="menu">
    <div class="menu-container">
        <h2 class="menu-container__title">Меню</h2>
        <ul class="menu-container__content horizontal-list"></ul>
        <span class="menu-container__btn button">Добавить раздел</span>
    </div>
</div>

`)
