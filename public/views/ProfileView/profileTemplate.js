export const renderProfileView = window.Handlebars.compile(`
<div id="profile-container">
    <div id="profile-main_block">

    </div>

    <div id="profile-right_block">
        <p><a href="/edit">Данные пользователя</a></p>
        <p><a href="/orders">Активные заказы</a></p>
        <p><a href="/chats">Чаты</a></p>
        <p><a href="/logout">Выйти</a></p>
    </div>
</div>
`)

export const renderProfileUserdataView = window.Handlebars.compile(`
<form id="profile-form-userdata">
    <input type="text" id="edit-number" class="edit-input" placeholder="Номер телефона" name="number" value={{ number }}/>
    <input type="email" id="edit-email" class="edit-input" placeholder="Почта" name="email" value={{ email }}/>
    <input type="text" id="edit-name" class="edit-input" placeholder="Имя" name="name" value={{ name }}/>
    <input type="password" id="edit-password" class="edit-input" placeholder="Password" name="password" />
    <input type="submit" class="button-log" value="Изменить данные"/>
</form>
`)

export const renderProfileOrdersView = window.Handlebars.compile(`
<div class="profile-orders">
    {{#each order}}
        <p>{{this}}</p>
    {{/each}}
</div>
`)

export const renderProfileChatsView = window.Handlebars.compile(`
<div class="profile-chats">
    {{#each chat}}
        <p>{{this}}</p>
    {{/each}}
</div>
`)
