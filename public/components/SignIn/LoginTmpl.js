export const renderLogin = window.Handlebars.compile(`
<div class="auth__container">
    <div class="auth__container__deep">
        <h2 style="text-align: center;">Вход в систему</h2>
        <form id="auth-form">
            <input type="text" id="login" class="auth-input" placeholder="mail@mail.ru" name="login" data-name="Email">
            <p id="loginError" class="error">Email</p>
            <input type="password" id="password" class="auth-input" placeholder="******" name="password" autocomplete="on" data-name="Password">
            <p id="passwordError" class="error">Password</p>
            <input type="submit" class="button-log" value="Войти">
            <p id="serverError" class="error"> </p>
            <p class="text" id="js_toRegistration" style="text-align: center;">Я тут впервые</p>
        </form>
    </div>
</div>
`)
