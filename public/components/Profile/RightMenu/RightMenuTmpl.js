export const renderRightMenu = window.Handlebars.compile(`
<p><a class="link" id="profile-menu__edit">Данные пользователя</a></p>
<p><a class="link" id="profile-menu__orders">Активные заказы</a></p>
<p><a class="link" id="profile-menu__chats">Чаты</a></p>
<p id="logout"><a class="link" href="/logout">Выйти</a></p>
`)
