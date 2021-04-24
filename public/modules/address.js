import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';

class Address {
    constructor () {
        this.longitude = '';
        this.latitude = '';
        this.name = '';
        eventBus.on(AuthEvents.changeActiveAddress, this.setAddress.bind(this));
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
