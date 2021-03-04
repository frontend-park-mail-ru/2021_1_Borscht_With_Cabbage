export async function ajaxGet ({
    url = '/',
} = {}) {
    let response = await fetch(url, {
        method: 'GET'
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
        body: JSON.stringify(body)
    });
    let parsedJSON = await response.json();

    return {
        status: response.status,
        parsedJSON: parsedJSON
    }
}