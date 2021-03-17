export const renderProfileEdits = window.Handlebars.compile(`
<form id="profile-form-userdata" enctype="multipart/form-data">
    <h1>Личные данные</h1>
    <input type="text" id="number" class="edit-input" placeholder="+7 (___) ___ ____" name="number" value={{ user.number }} data-name="Phone">
    <p id="numberError" class="error">Номер телефона</p>
    <input type="email" id="email" class="edit-input" placeholder="mail@mail.ru" name="email" value={{ user.email }} data-name="Email">
    <p id="emailError" class="error">Почта</p>
    <input type="text" id="name" class="edit-input" placeholder="Name Surname" name="name" value={{ user.name }} data-name="Name">
    <p id="nameError" class="error">Имя</p>

    
    <button class="button-log" id="input--avatar--button">Загрузить аватар</button>
    <input name="avatar" id="input--avatar" type="file" style="display: none;"/>

    <input type="submit" class="button-log" value="Изменить данные">
    <p id="totalError" class="error"> </p>
</form>
`)
