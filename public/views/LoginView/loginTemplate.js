export const renderLoginView = window.Handlebars.compile(`
<h2>Вход в систему</h2>
<form id="auth-form">
    <input type="email" id="email" class="auth-input" placeholder="Email" name="email">
    <p id="emailError" class="error"></p>
    <input type="password" id="password" class="auth-input" placeholder="Password" name="password">
    <p id="passwordError" class="error"></p>
    <input type="submit" class="button-log" value="Войти">
    <p><a class="text" href="/signup">Я тут впервые</a></p>
</form>
`)
