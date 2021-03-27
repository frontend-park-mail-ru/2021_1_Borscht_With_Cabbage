export const renderRestaurantSignUp = window.Handlebars.compile(`
<div class="authorization" >
    <div class="authorization-container" style="margin: 50px 0">
        <h2 class="authorization-container__title">Регистрация ресторана</h2>
        <a class="text link authorization-container__anotherAuth" style="text-align: center;" href="signin">У меня нет ресторана, я просто хочу кушать</a>
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
            <a class="text link" style="text-align: center;" href="restaurant/signin">Уже зарегистрирован</a>
        </form>
    </div>
</div>
`)
