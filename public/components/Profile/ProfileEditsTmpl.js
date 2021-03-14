export const renderProfileEdits = window.Handlebars.compile(`
<form id="profile-form-userdata" enctype="multipart/form-data">
    <h1>Личные данные</h1>
    <input type="text" id="number" class="edit-input" placeholder="Номер телефона" name="number" value={{ user.number }}>
    <p id="numberError" class="error">Номер телефона</p>
    <input type="email" id="email" class="edit-input" placeholder="Почта" name="email" value={{ user.email }}>
    <p id="emailError" class="error">Почта</p>
    <input type="text" id="name" class="edit-input" placeholder="Имя" name="name" value={{ user.name }}>
    <p id="nameError" class="error">Имя</p>
    <input type="password" id="password_current" class="edit-input" placeholder="Текущий пароль" name="password_current" autocomplete="on">
    <p id="repeatPasswordError" class="error">Текущий пароль</p>
    <input type="password" id="password" class="edit-input" placeholder="Новый пароль" name="password" autocomplete="on">
    <p id="passwordError" class="error">Новый пароль</p>
    <input type="password" id="password_repeat" class="edit-input" placeholder="Повторите пароль" name="password_repeat" autocomplete="on">
    <p id="repeatPasswordError" class="error">Повторите пароль</p>
    <img src="{{ user.avatar }}" class="profile-avatar" alt="ava" id="current_ava"/>
    <input type="file" id="avatar" name="avatar" accept="image/*"><br/><br/>
    <input type="submit" class="button-log" value="Изменить данные">
    <p id="totalError" class="error"> </p>
</form>
`)
