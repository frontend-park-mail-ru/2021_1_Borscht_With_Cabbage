export async function ajaxGet ({
    url = '/',
} = {}) {
    let response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}

export async function ajaxPost ({
    url = '/',
    body = null
} = {}) {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}