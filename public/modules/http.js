// window.serverAddress = 'http://89.208.197.150:5000';
window.serverAddress = 'http://127.0.0.1:5000'

function getParams ({
    method = 'GET',
    body = null,
    type
}) {
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    // TODO: надо разобраться с этими всеми запросами
    if (type === 'application/json') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
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

    return {
        status: parsedJSON.code,
        parsedJSON: parsedJSON.data
    };
}

export class Http {
    static async ajaxGet ({
        url = '/'
    } = {}) {
        return await makeFetch({ url: url, method: 'GET', type: 'application/json' });
    }

    static async ajaxPost ({
        url = '/',
        body = null
    } = {}) {
    return await makeFetch({ url: url, method: 'POST', body: body, type: 'application/json' });
    }

    static async ajaxPutJson ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'PUT', body: body, type: 'application/json'});
    }

    static async ajaxPutFormData ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'PUT', body: body });
    }

    static async ajaxDelete ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'DELETE', body: body, type: 'application/json'});
    }
}
