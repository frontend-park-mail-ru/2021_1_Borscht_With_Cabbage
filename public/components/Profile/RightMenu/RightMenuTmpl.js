export const renderRightMenu = window.Handlebars.compile(`
<p><a class="link" id="profile-menu__edit" href="/edit">Данные пользователя</a></p>
<p><a class="link" id="profile-menu__orders" href="/orders">Активные заказы</a></p>
<p><a class="link" id="profile-menu__chats" href="/chats">Чаты</a></p>
<p id="logout"><a class="link" href="/logout">Выйти</a></p>
`)
