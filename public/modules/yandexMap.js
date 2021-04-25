import { noop } from './utils.js';

export class YandexMap {
    constructor () {
        this.initPos = {
            latitude: 55.751574,
            longitude: 37.57385
        };
    }

    setRestaurant (pos, radius) {
        ymaps.ready(() => {
            this.setCenter(pos, 12);
            this.createCircle(pos, radius);
        });
    }

    setUser (address) {
        ymaps.ready(() => {
            this.map.geoObjects
                .add(new ymaps.GeoObject({
                    geometry: {
                        type: 'Point',
                        coordinates: this.convectPosObjectToArray(address)
                    },
                    properties: {
                        iconContent: 'Вы здесь',
                        hintContent: address.name
                    }
                }, {
                    preset: 'islands#blackStretchyIcon',
                    draggable: false
                }));
            this.setCenter(address, 12);
        });
    }

    render ({
        id,
        pos = this.initPos,
        isStatic = false
    } = {}, callback = noop) {
        ymaps.ready(this.init.bind(this, { id, pos, isStatic }, callback));
    }

    init ({
        id,
        pos,
        isStatic
    } = {}, callback) {
        this.callback = callback;
        this.pos = pos;
        document.getElementById(id).innerHTML = '';
        this.map = new ymaps.Map(id, {
            center: this.convectPosObjectToArray(this.pos),
            zoom: 11,
            openBalloonOnClick: false,
            controls: []
        });

        if (!isStatic) {
            this.addListeners();
        }
    }

    addListeners () {
        this.map.events.add('click', (e) => {
            const coords = e.get('coords');
            this.movePoint(this.convertPosArrayToObject(coords));
            this.getAddress();
        });

        this.map.geoObjects.events.add('click', (e) => {
            const coords = e.get('coords');
            this.movePoint(this.convertPosArrayToObject(coords));
            this.getAddress();
        });
    }

    getAddress () {
        ymaps.geocode(this.convectPosObjectToArray(this.pos))
            .then((res) => {
                this.catchCallback(res);
            });
    }

    catchCallback (res, isRenew = true) {
        this.text = this.getUserPositionAddress(res.geoObjects.get(0).properties);
        const address = {
            name: this.text,
            latitude: this.pos.latitude,
            longitude: this.pos.longitude
        };
        this.callback(address, isRenew);
    }

    setCenter (pos, zoom) {
        this.map.setCenter(this.convectPosObjectToArray(pos), zoom);
    }

    addSearch (id) {
        ymaps.ready(() => {
            const suggestView = new ymaps.SuggestView(id, {
                offset: [10, 10]
            });
            suggestView.events.add('select', (e) => {
                const myGeocoder = ymaps.geocode(e.originalEvent.item.value);
                myGeocoder.then(
                    (res) => {
                        this.movePoint(this.convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates()));
                        this.setCenter(this.convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates(), 1));
                        this.catchCallback(res, false);
                    }
                ).catch(
                    (err) => {
                        console.log(err.message);
                    });
            });
        });
    }

    movePoint (pos) {
        this.addPoint(pos);
        this.createCircle(pos, 0);
    }

    addPoint (pos) {
        if (this.pos) {
            this.deletePoint(this.point);
            this.point = this.createPoint(pos);
        }
        this.pos = pos;
    }

    deletePoint (point) {
        this.map.geoObjects.remove(point);
    }

    createPoint (pos) {
        const point = new ymaps.Placemark(this.convectPosObjectToArray(pos));
        this.map.geoObjects.add(point);

        return point;
    }

    createCircle (pos, radius) {
        const circle = new ymaps.Circle([this.convectPosObjectToArray(pos), radius]);
        this.map.geoObjects.add(circle);

        return circle;
    }

    convertPosArrayToObject (coords) {
        return {
            latitude: coords[0],
            longitude: coords[1]
        };
    }

    convectPosObjectToArray (pos) {
        return [pos.latitude, pos.longitude];
    }

    getUserPositionAddress (properties) {
        const prop = properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country;
        return prop.AddressLine;
    }
}
