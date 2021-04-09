export const renderRestaurantEdits = window.Handlebars.compile(`
<form id="restaurant-userdata" enctype="multipart/form-data">
    <h1>Личные данные</h1>
    
    <input type="text" id="number" placeholder="+7 (___) ___ ____" name="number"  data-name="Номер телефона" value="{{ user.number }}">
    <p id="numberError" class="error">Номер телефона</p>
    
    <input type="email" id="email" placeholder="mail@mail.ru" name="email"  data-name="Почта" value="{{ user.email }}">
    <p id="emailError" class="error">Почта</p>
    
    <input type="text" id="name" placeholder="Name Surname" name="name"  data-name="Имя" value="{{ user.name }}">
    <p id="nameError" class="error">Имя</p>
    
    <input type="number" id="deliveryCost" placeholder="Стоимость доставки" name="deliveryCost" data-name="Стоимость доставки" value="{{ user.deliveryCost }}" >
    <p id="deliveryCostError" class="error">Стоимость доставки</p>
    
    <input type="password" id="password_current" placeholder="******" data-name="Текущий пароль" name="password_current" autocomplete="on">
    <p id="repeatPasswordError" class="error">Текущий пароль</p>
    
    <input type="password" id="password" placeholder="******" data-name="Новый пароль" name="password" autocomplete="on">
    <p id="passwordError" class="error">Новый пароль</p>
    
    <input type="password" id="password_repeat" placeholder="******" data-name="Повторите пароль" name="password_repeat" autocomplete="on">
    <p id="repeatPasswordError" class="error">Повторите пароль</p>
    
    <button class="button" id="input-avatar-button">Загрузить аватар</button>
    <input name="avatar" id="input-avatar" type="file" style="display: none;"/>
    <input type="submit" class="button" value="Изменить данные">
    <p id="totalError" class="error"> </p>
</form>
`)