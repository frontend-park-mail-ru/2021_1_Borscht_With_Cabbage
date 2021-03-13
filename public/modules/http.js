window.serverAddress = 'http://127.0.0.1:5000';

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
        status: response.status,
        parsedJSON: parsedJSON
    };
}

export async function ajaxGet ({
    url = '/'
} = {}) {
    return await makeFetch({ url: url, method: 'GET' });
}

export async function ajaxPost ({
    url = '/',
    body = null
} = {}) {
    return await makeFetch({ url: url, method: 'POST', body: body });
}

export async function ajaxPut ({
    url = '/',
    body = null
} = {}) {
    return await makeFetch({ url: url, method: 'PUT', body: body });
}
