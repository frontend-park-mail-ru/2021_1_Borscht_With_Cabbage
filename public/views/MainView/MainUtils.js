export class CreatorUrl {
    constructor () {
        // структура будет помогать создавать запрос серверу
        this.request = {
            offset: 0,
            limit: 20,
            category: [],
            params: {
                // содержимое временное, потом будут храниться содержимое параметров поиска
                time: false,
                receipt: false,
                rating: false
            }
        }
    }

    clickCategory ({ name = '' }) {
        const index = this.request.category.indexOf(name);

        if (index === -1) {
            this.request.category.push(name);
        } else {
            this.request.category.splice(index, 1);
        }

        this.request.offset = 0;
    }

    clickParams ({ params, value = false }) {
        if (!params) {
            return;
        }
        // TODO выбор из предложенных параметров
        this.request.params[params] = value;

        this.request.offset = 0;
    }

    get () {
        let url = `/restaurants?limit=${this.request.limit}&offset=${this.request.offset}`;

        if (this.request.category.length > 0) url += '&category=';

        url += this.request.category.join(',');

        for (const key in this.request.params) {
            url += `&${key}=${this.request.params[key]}`;
        }

        console.log(url);

        this.request.offset += this.request.limit;

        return url;
    }
}
