const serverAddress = 'http://127.0.0.1:5000';

export async function ajaxGet ({
    url = '/'
} = {}) {
    const response = await fetch(serverAddress + url, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
    const parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    };
}

export async function ajaxPost ({
    url = '/',
    body = null
} = {}) {
    const response = await fetch(serverAddress + url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
    const parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    };
}

export async function ajaxPut ({
    url = '/',
    body = null
} = {}) {
    const response = await fetch(serverAddress + url, {
        mode: 'cors',
        method: 'PUT',
        credentials: 'include',
        body: body,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    const parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}
