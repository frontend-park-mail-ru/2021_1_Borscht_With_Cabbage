export const renderProfileEdits = window.Handlebars.compile(`
<form id="profile-form-userdata">
    <h1>Личные данные</h1>
    <input type="text" id="number" class="edit-input" placeholder="Номер телефона" name="number" value={{ number }}>
    <p id="numberError" class="error"></p>
    <input type="email" id="email" class="edit-input" placeholder="Почта" name="email" value={{ email }}>
    <p id="emailError" class="error"></p>
    <input type="text" id="name" class="edit-input" placeholder="Имя" name="name" value={{ name }}>
    <p id="nameError" class="error"></p>
    <input type="submit" class="button-log" value="Изменить данные"/>
</form>
`)
