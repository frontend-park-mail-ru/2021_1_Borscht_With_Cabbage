export const renderRestaurantRightMenu = window.Handlebars.compile(`
<p><a class="link" id="restaurant-menu__edit">Данные ресторана</a></p>
<p><a class="link" id="restaurant-menu__menu">Меню</a></p>
<p><a class="link" id="restaurant-menu__orders">Активные заказы</a></p>
<p><a class="link" id="restaurant-menu__chats">Чаты</a></p>
<p id="logout"><a class="link" href="/logout">Выйти</a></p>
`)