class Address {
    constructor () {
        this.longitude = '';
        this.latitude = '';
        this.name = '';
    }

    setAddress ({ longitude, latitude, name }) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
    }

    getAddress () {
        return { longitude: this.longitude, latitude: this.latitude, name: this.name }
    }
}

export default new Address();
