export const renderProfileView = window.Handlebars.compile(`
<div class="profile">
    <div id="profile-left-block">
    </div>

    <div id="profile-right-block">
        <p><a class="link" href="/edit">Данные пользователя</a></p>
        <p><a class="link" href="/orders">Активные заказы</a></p>
        <p><a class="link" href="/chats">Чаты</a></p>
        <p id="logout"><a class="link" href="/logout">Выйти</a></p>
    </div>
</div>
`)