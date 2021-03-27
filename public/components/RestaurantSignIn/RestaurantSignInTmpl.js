export const renderRestaurantLogin = window.Handlebars.compile(`
<div class="authorization">
    <div class="authorization-container">
        <h2 class="authorization-container__title">Войти как ресторан</h2>
        <a class="text link authorization-container__anotherAuth" style="text-align: center;" href="signin">У меня нет ресторана, я просто хочу кушать</a>
        <form id="authorization-form">
            <input type="text" id="login" placeholder="mail@mail.ru" name="login" data-name="Email">
            <p id="loginError" class="error">Email</p>
            <input type="password" id="password" placeholder="******" name="password" autocomplete="on" data-name="Password">
            <p id="passwordError" class="error">Password</p>
            <input type="submit" class="button" value="Войти">
            <p id="serverError" class="error"> </p>
            <a class="text link" style="text-align: center;" href="restaurant/signup">Зарегистрировать свой ресторан</a>
        </form>
    </div>
</div>
`)
