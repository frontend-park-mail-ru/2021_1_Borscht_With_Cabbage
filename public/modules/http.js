import eventBus from './eventBus.js';
import { AuthEvents } from 'Events/AuthEvents.js';

window.serverAddress = 'https://delivery-borscht.ru/api';
// window.serverAddress = 'http://127.0.0.1:5000/api'

function getParams ({
    method = 'GET',
    body = null,
    type = 'application/json'
}) {
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    // TODO: надо разобраться с этими всеми запросами
    if (type === 'application/json') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }
    if (method !== 'GET') {
        const csrf = document.cookie.match(/_csrf=([\w-]+)/);
        console.log("SCRF: ", csrf);
        if (csrf) {
            headers['X-XSRF-Token'] = csrf[1];
        }
    }
    const init = {
        mode: 'cors',
        credentials: 'include',
        method,
        headers
    };
    if (method !== 'GET') {
        init.body = body;
    }
    return init;
}

async function makeFetch ({
    url = '/',
    body = null,
    method = 'GET',
    type
} = {}) {
    const response = await fetch(window.serverAddress + url, getParams({ method, body, type }));
    const parsedJSON = await response.json();
    if (parsedJSON.code === 418) {
        eventBus.emit(AuthEvents.offline, { message: parsedJSON.message, color: 'red' });
    }

    return {
        status: parsedJSON.code,
        parsedJSON: parsedJSON.data
    };
}

export class Http {
    static async ajaxGet ({
        url = '/'
    } = {}) {
        return await makeFetch({ url: url, method: 'GET' });
    }

    static async ajaxPost ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'POST', body: body });
    }

    static async ajaxPutJson ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'PUT', body: body });
    }

    static async ajaxPutFormData ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'PUT', body: body, type: '' });
    }

    static async ajaxDelete ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'DELETE', body: body });
    }
}
