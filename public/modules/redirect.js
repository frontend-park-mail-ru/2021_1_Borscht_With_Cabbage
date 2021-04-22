class Redirect {
    constructor () {
        this.redirect = '';
    }

    push (url) {
        this.redirect = url;
    }

    pop () {
        const url = this.redirect;
        this.clear();
        return url;
    }

    clear () {
        this.redirect = '';
    }
}

export default new Redirect();
