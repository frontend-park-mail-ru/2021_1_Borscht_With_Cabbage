export async function ajaxGet ({
    url = '/'
} = {}) {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}

export async function ajaxPost ({
    url = '/',
    body = null
} = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}

export async function ajaxPut ({
                                    url = '/',
                                    body = null
                                } = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}
