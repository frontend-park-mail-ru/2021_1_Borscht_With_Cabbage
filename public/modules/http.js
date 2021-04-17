import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';

window.serverAddress = 'http://89.208.197.150:5000';
// window.serverAddress = 'http://127.0.0.1:5000'

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
        headers['X-XSRF-Token'] = document.cookie.match(/_csrf=([\w-]+)/)[1];
    }
    const init = {
        mode: 'cors',
        method: method,
        credentials: 'include',
        headers: headers
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
    const response = await fetch(window.serverAddress + url, getParams({ method: method, body: body, type: type }));
    const parsedJSON = await response.json();
    if (parsedJSON.code === 418) {
        eventBus.emit(AuthEvents.offline, { message: parsedJSON.message });
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
