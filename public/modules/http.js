// window.serverAddress = 'http://89.208.197.150:5000';
window.serverAddress = 'http://127.0.0.1:5000'

function getParams ({
    method = 'GET',
    body = null
}) {
    const headers = {
        'Access-Control-Allow-Origin': '*'
    }
    if (method !== 'PUT') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }
    const init = {
        mode: 'cors',
        method: method,
        credentials: 'include',
        headers: headers
    }
    if (method !== 'GET') {
        init.body = body;
    }
    return init;
}

async function makeFetch ({
    url = '/',
    body = null,
    method = 'GET'
} = {}) {
    const response = await fetch(window.serverAddress + url, getParams({ method: method, body: body }))
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
        return await makeFetch({ url: url, method: 'GET' });
    }

    static async ajaxPost ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'POST', body: body });
    }

    static async ajaxPut ({
        url = '/',
        body = null
    } = {}) {
        return await makeFetch({ url: url, method: 'PUT', body: body });
    }
}
