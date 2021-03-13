const emailRegExpression = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const phoneRegExpression = /^[0-9\-+]{9,15}$/;

const blankResult = {
    result: false,
    text: 'Поле должно быть заполнено'
};

export class Validator {
    static validateEmail (email) {
        if (email === '') {
            return blankResult;
        }
        if (!emailRegExpression.test(email)) {
            return {
                result: false,
                text: 'Введите настоящий адрес электронной почты'
            };
        }
        return { result: true };
    }

    static validatePassword (password) {
        if (password === '') {
            return blankResult;
        }
        if (password.length > 30 || password.length < 6) {
            return {
                result: false,
                text: 'Ваш пароль должен быть от 6 до 30 символов'
            };
        }
        return { result: true };
    }

    static validateName (username) {
        if (username === '') {
            return blankResult;
        }
        return { result: true };
    }

    static validatePhone (number) {
        if (number === '') {
            return blankResult;
        }
        if (!phoneRegExpression.test(number)) {
            return {
                result: false,
                text: 'Введите настоящий номер телефона'
            };
        }
        return { result: true };
    }

    static validateEqualPassword (password, repeatPassword) {
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

    static validateLogin (login) {
        if (login === '') {
            return blankResult;
        }
        if (!emailRegExpression.test(login) && !phoneRegExpression.test(login)) {
            return {
                result: false,
                text: 'Введите почту или телефон'
            };
        }
        return { result: true };
    }
}
