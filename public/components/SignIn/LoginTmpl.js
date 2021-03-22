export const renderLogin = window.Handlebars.compile(`
<div class="authorization">
    <div class="authorization-container">
        <h2 class="authorization-container__title">Вход в систему</h2>
        <form id="authorization-form">
            <input type="text" id="login" placeholder="mail@mail.ru" name="login" data-name="Email">
            <p id="loginError" class="error">Email</p>
            <input type="password" id="password" placeholder="******" name="password" autocomplete="on" data-name="Password">
            <p id="passwordError" class="error">Password</p>
            <input type="submit" class="button" value="Войти">
            <p id="serverError" class="error"> </p>
            <p class="text" id="js_toRegistration" style="text-align: center;">Я тут впервые</p>
        </form>
    </div>
</div>
`)
