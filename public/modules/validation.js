const emailRegExpression = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const passwordRegExpression = /^([A-Za-z0-9_\-.]{6,30})$/;
const usernameRegExpression = /^([A-Za-z0-9_\-.]{6,30})$/;

const blankResult = {
    result: false,
    text: 'Поле должно быть заполнено'
};

export class Validator {
    validateEmail (email) {
        if (email === '') {
            return blankResult;
        }
        if (!emailRegExpression.test(email)) {
            return {
                result: false,
                text: 'Пожалуйста, введите настоящий адрес электронной почты'
            };
        }
        return { result: true };
    }

    validatePassword (password) {
        if (password === '') {
            return blankResult;
        }
        if (password.length > 30 || password.length < 6) {
            return {
                result: false,
                text: 'Ваш пароль должен быть от 6 до 30 символов'
            };
        }
        if (!passwordRegExpression.test(password)) {
            return {
                result: false,
                text: 'Ваш пароль должен состоять из латинских символов, чисел или знаков "-", "_", "."'
            };
        }
        return { result: true };
    }

    validateEqualPassword (password, repeatPassword) {
        if (repeatPassword === '') {
            return blankResult;
        }
        if (password !== repeatPassword) {
            return {
                result: false,
                text: 'Пароли не совпадают'
            };
        }
        return { result: true };
    }
}