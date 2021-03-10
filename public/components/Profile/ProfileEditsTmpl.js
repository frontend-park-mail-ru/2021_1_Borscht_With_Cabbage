export const renderProfileEdits = window.Handlebars.compile(`
<form id="profile-form-userdata" enctype="multipart/form-data">
    <h1>Личные данные</h1>
    <input type="text" id="number" class="edit-input" placeholder="Номер телефона" name="number" value={{ number }}/>
    <p id="numberError" class="error"></p>
    <input type="email" id="email" class="edit-input" placeholder="Почта" name="email" value={{ email }}/>
    <p id="emailError" class="error"></p>
    <input type="text" id="name" class="edit-input" placeholder="Имя" name="name" value={{ name }}/>
    <p id="nameError" class="error"></p>
    <img src="http://127.0.0.1:5000/avatar" class="profile-avatar" alt="ava"/>
    <input type="file" id="avatar" name="avatar" accept="image/*"/><br/><br/>
    <input type="submit" class="button-log" value="Изменить данные"/>
    <p id="totalError" class="error"></p>
</form>
`)
