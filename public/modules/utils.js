const noop = () => {
};

function bytesToSize (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) {
        return '0 Byte';
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

function getError (data) {
    const notDefaultAnswer = `Наш сервер говорит "${data.parsedJSON}"`;
    switch (data.status) {
    case 500:
        if (data.parsedJSON === 'server error') {
            return 'Проблемы на сервере! Стоит обновить страницу.';
        } else {
            return notDefaultAnswer;
        }
    case 400:
        console.log(400)
        if (data.parsedJSON === 'bad request') {
            return 'Наш сервер думает что вы что-то сделали неправильно...';
        } else {
            return notDefaultAnswer;
        }
    case 401:
        if (data.parsedJSON === 'not authorized') {
            return 'Кажется для этого действия надо авторизоваться...';
        } else {
            return notDefaultAnswer;
        }
    default:
        return notDefaultAnswer;
    }
}

export { noop, bytesToSize, getError };
