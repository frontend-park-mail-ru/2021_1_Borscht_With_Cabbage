import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { postAddress } from './api.js';
import user from './user.js';

class Address {
    constructor () {
        const address_ = localStorage['address'];
        if (address_) {
            const address = JSON.parse(address_);
            this.longitude = address.longitude;
            this.latitude = address.latitude;
            this.name = address.name;
        } else {
            this.longitude = '';
            this.latitude = '';
            this.name = '';
        }
        eventBus.on(AuthEvents.changeActiveAddress, this.setAddress.bind(this));
    }

    setAddress ({ longitude, latitude, name }) {
        localStorage['address'] = JSON.stringify({ longitude, latitude, name });
        if (user.isAuth && user.role === 'user') {
            if ((String(longitude) !== String(this.longitude) || String(latitude) !== String(this.latitude) || name !== this.name)
            && longitude && latitude && name) {
                postAddress({ longitude: String(longitude), latitude: String(latitude), name })
                    .then((res) => {
                        if (res.status === 200) {
                            user.address = { longitude, latitude, name };
                        }
                    });
            }
        }
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
    }

    getAddress () {
        return { longitude: this.longitude, latitude: this.latitude, name: this.name }
    }
}

export default new Address();
