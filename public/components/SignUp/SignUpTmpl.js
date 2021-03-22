export const renderSignUp = window.Handlebars.compile(`
<div class="authorization" >
    <div class="authorization-container" style="margin: 50px 0">
        <h2 class="authorization-container__title">Регистрация</h2>
        <form id="auth-form">
            <input type="email" id="email" placeholder="mail@mail.ru" name="email" data-name="Email">
            <p id="emailError" class="error">Email</p>
            <input type="tel" id="phone" placeholder="+7 (___) ___ ____" name="phone" value="+7 (___) ___ ____" data-name="Phone">
            <p id="phoneError" class="error">Phone</p>
            <input type="text" id="name" placeholder="Name Surname" name="name" data-name="Name">
            <p id="nameError" class="error">Name</p>
            <input type="password" id="password" placeholder="******" name="password" autocomplete="on" data-name="Password">
            <p id="passwordError" class="error">Password</p>
            <input type="password" id="repeatPassword" placeholder="******" name="repeatPassword" autocomplete="on" data-name="Repeat password">
            <p id="repeatPasswordError" class="error">Repeat password</p>
            <input type="submit" class="button" value="Зарегистрироваться">
            <p id="serverError" class="error"> </p>
            <p style="text-align: center;" class="text" id="js_toLogin">У меня уже есть аккаунт</p>
        </form>
    </div>
</div>
`)
