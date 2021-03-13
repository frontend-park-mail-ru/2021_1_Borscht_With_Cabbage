export const renderLogin = window.Handlebars.compile(`
<div class="auth__container">
    <div class="auth__container__deep">
        <h2 style="text-align: center;">Вход в систему</h2>
        <form id="auth-form">
            <input type="text" id="login" class="auth-input" placeholder="Email or phone" name="login">
            <p id="loginError" class="error">Email or phone</p>
            <input type="password" id="password" class="auth-input" placeholder="Password" name="password" autocomplete="on">
            <p id="passwordError" class="error">Password</p>
            <input type="submit" class="button-log" value="Войти">
            <p id="serverError" class="error"> </p>
            <p style="text-align: center;"><a class="text" href="/signup" >Я тут впервые</a></p>
        </form>
    </div>
</div>
`)
