export const renderProfileView = window.Handlebars.compile(`
<div id="profile-container">
    <div id="profile-main_block">
    </div>

    <div id="profile-right_block">
        <p class="profile-link"><a href="/edit">Данные пользователя</a></p>
        <p class="profile-link"><a href="/orders">Активные заказы</a></p>
        <p class="profile-link"><a href="/chats">Чаты</a></p>
        <p class="profile-link"><a href="/logout">Выйти</a></p>
    </div>
</div>
`)
