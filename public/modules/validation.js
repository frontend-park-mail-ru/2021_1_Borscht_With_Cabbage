export class Validator {

    constructor () {
        this.emailRegExpression = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        this.passwordRegExpression = /^([A-Za-z0-9_\-.]{6,30})$/;
        this.usernameRegExpression = /^([A-Za-z0-9_\-.]{6,30})$/;
    }

    validateEmail () {
        const email = document.getElementById('email').value;
        if (!this.emailRegExpression.test(email)) {
            return {
                result: false,
                text: 'Пожалуйста, введите настоящий адрес электронной почты'
            };
        }
        return { result: true };
    }

    validatePassword () {
        const password = document.getElementById('password').value;
        if (!this.passwordRegExpression.test(password)) {
            return {
                result: false,
                text: 'Ваш пароль должен быть от 6 до 30 символов длиной и состоять из латинских символов, чисел или знаков "-", "_", "."'
            };
        }
        return { result: true };
    }

    validateUsername () {
        const username = document.getElementById('username').value;
        if (!this.usernameRegExpression.test(username)) {
            return {
                result: false,
                text: 'Ваш username должен быть от 6 до 30 символов длиной и состоять из латинских символов, чисел или знаков "-", "_", "."'
            };
        }
        return { result: true };
    }

    validateEqualPassword () {
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeatPassword').value;
        if (password !== repeatPassword) {
            return {
                result: false,
                text: 'Пароли не совпадают'
            };
        }
        return { result: true };
    }
}