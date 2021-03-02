(function () {
    const noop = () => null;

    class HttpModule {
        ajax ({
            method = 'GET',
            url = '/',
            body = null,
            callback = noop
        } = {}) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                callback(xhr.status, xhr.responseText);
            });

            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.send(JSON.stringify(body));
                return;
            }

            xhr.send();
        }

        get (params = {}) {
            this.ajax({
                ...params,
                method: 'GET'
            });
        }

        post (params = {}) {
            this.ajax({
                ...params,
                method: 'POST'
            });
        }
    }

    window.HttpModule = new HttpModule();
})();
