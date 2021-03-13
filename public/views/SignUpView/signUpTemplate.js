export const renderSignUpView = window.Handlebars.compile(`
<h2>Регистрация</h2>
<form id="auth-form">
    <input type="email" id="email" class="auth-input" placeholder="Email" name="email">
    <p id="emailError" class="error"></p>
    <input type="tel" id="phone" class="auth-input" placeholder="Phone" name="phone">
    <p id="phoneError" class="error"></p>
    <input type="text" id="name" class="auth-input" placeholder="Name" name="name">
    <p id="nameError" class="error"></p>
    <input type="password" id="password" class="auth-input" placeholder="Password" name="password" autocomplete="on">
    <p id="passwordError" class="error"></p>
    <input type="password" id="repeatPassword" class="auth-input" placeholder="Repeat password" name="repeatPassword" autocomplete="on">
    <p id="repeatPasswordError" class="error"></p>
    <input type="submit" class="button-log" value="Войти">
    <p id="serverError" class="error"></p>
    <p><a class="text" href="/signin">Хочу залогиниться</a></p>
</form>
`)
