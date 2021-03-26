export const renderRestaurantSignUp = window.Handlebars.compile(`
<div class="authorization" >
    <div class="authorization-container" style="margin: 50px 0">
        <h2 class="authorization-container__title">Регистрация ресторана</h2>
        <form id="authorization-form">
            <input type="email" id="email" placeholder="mail@mail.ru" name="email" data-name="Email">
            <p id="emailError" class="error">Электронная почта</p>
            <input type="tel" id="number" placeholder="+7 (___) ___ ____" name="phone" value="+7 (___) ___ ____" data-name="Phone">
            <p id="phoneError" class="error">Телефон</p>
            <input type="text" id="title" placeholder="Название ресторана" name="title" data-name="Title">
            <p id="titleError" class="error">Название ресторана</p>
            <input type="password" id="password" placeholder="******" name="password" autocomplete="on" data-name="Password">
            <p id="passwordError" class="error">Пароль</p>
            <input type="password" id="repeatPassword" placeholder="******" name="repeatPassword" autocomplete="on" data-name="Repeat password">
            <p id="repeatPasswordError" class="error">Повторите пароль</p>
            <input type="submit" class="button" value="Зарегистрировать свой ресторан">
            <p id="serverError" class="error"> </p>
            <p style="text-align: center;" class="text" id="js_toLogin">Уже зарегистрирован</p>
        </form>
    </div>
</div>
`)
