export const renderLoginView = Handlebars.compile(`
<h2>Вход в систему</h2>
<form id="auth-form">
    <input type="email" id="auth-login" class="auth-input" placeholder="Email" name="email">
    <input type="password" id="auth-password" class="auth-input" placeholder="Password" name="password">
    <input type="submit" class="button-log" value="Войти">
    <p><a class="text" href="/signup">Я тут впервые</a></p>
</form>
`)
