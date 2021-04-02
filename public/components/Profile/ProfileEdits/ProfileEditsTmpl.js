export const renderProfileEdits = window.Handlebars.compile(`
<div class="profile-left-block-edits profile-card">
    <h1>Личные данные</h1>
    <form id="profile-userdata" enctype="multipart/form-data">
        <input type="text" id="number" placeholder="+7 (___) ___ ____" name="number" data-name="Номер телефона" value={{ user.number }} >
        <p id="numberError" class="error">Номер телефона</p>
        <input type="email" id="email" placeholder="mail@mail.ru" name="email" data-name="Почта" value={{ user.email }}>
        <p id="emailError" class="error">Почта</p>
        <input type="text" id="name" cplaceholder="Name Surname" name="name" data-name="Имя" value={{ user.name }}>
        <p id="nameError" class="error">Имя</p>
        <input type="password" id="password_current" placeholder="******" data-name="Текущий пароль" name="password_current" autocomplete="on">
        <p id="password_currentError" class="error">Текущий пароль</p>
        <input type="password" id="password" placeholder="******" data-name="Новый пароль" name="password" autocomplete="on">
        <p id="passwordError" class="error">Новый пароль</p>
        <input type="password" id="password_repeat" placeholder="******" data-name="Повторите пароль" name="password_repeat" autocomplete="on">
        <p id="password_repeatError" class="error">Повторите пароль</p>
        <button class="button" id="input-avatar-button">Загрузить аватар</button>
        <input name="avatar" id="input-avatar" type="file" style="display: none;"/>
    
        <input type="submit" class="button" value="Изменить данные">
        <p id="serverError" class="error"> </p>
    </form>
</div>

`)
