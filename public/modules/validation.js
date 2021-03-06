const emailRegExpression = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const phoneRegExpression = /^[0-9]{11}$/;

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

    static validateDescription (text) {
        if (text === '') {
            return blankResult;
        }
        return { result: true };
    }

    static validateNumber (number) {
        // TODO: валидация целого числа
        number = Number(number);
        if (!number) {
            return {
                result: false,
                text: 'Введите число'
            };
        }
        return { result: true };
    }

    static validatePhone (number) {
        if (number === '') {
            return blankResult;
        }
        number = number.replace(/\D/g, '');
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

    static validateChangeNewPassword (newPassword) {
        if (newPassword === '') {
            return { result: true };
        }
        return this.validatePassword(newPassword);
    }

    static validateChangeOldPassword (oldPassword, newPassword) {
        if (newPassword === '') {
            return { result: true };
        }
        return this.validatePassword(oldPassword);
    }

    static validateChangePasswordRepeat (newPassword, newPasswordRepeat) {
        if (newPassword === '') {
            return { result: true };
        }
        return this.validateEqualPassword(newPassword, newPasswordRepeat);
    }

    static validateRealNumber (num) {
        if (num === '') {
            return blankResult;
        }
        if (isNaN(num)) {
            return {
                result: false,
                text: 'Введите число'
            };
        }
        return { result: true };
    }

    static validateOptionalNumber (num) {
        if (!num) {
            return { result: true };
        }
        if (isNaN(num)) {
            return {
                result: false,
                text: 'Введите число'
            };
        }
        return { result: true };
    }
}
