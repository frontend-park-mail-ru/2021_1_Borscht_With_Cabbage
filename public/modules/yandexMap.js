export class YandexMap {
    constructor () {
        this.initPos = {
            latitude: 55.751574,
            longitude: 37.57385
        };
    }

    setRestaurant (pos, radius) {

    }

    setUser (pos) {

    }

    render (id, callback) {
        ymaps.ready(this.init.bind(this, id, callback));
    }

    init (id, callback) {
        this.callback = callback;
        document.getElementById(id).innerHTML = '';
        this.map = new ymaps.Map(id, {
            center: this.convectPosObjectToArray(this.initPos),
            zoom: 10,
            openBalloonOnClick: false,
            controls: []
        });

        this.addListeners();
    }

    addListeners() {
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

    getAddress() {
        ymaps.geocode([this.pos.latitude, this.pos.longitude])
            .then((res) => {
                this.text = this.getUserPositionAddress(res.geoObjects.get(0).properties);
                this.callback(this.text);
            });
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
        this.addCircle(pos, this.radius);
    }

    addPoint (pos) {
        this.pos = pos;
        if (this.pos !== undefined) {
            this.deletePoint(this.point);
            this.point = this.createPoint(pos);
        }
    }

    deletePoint (point) {
        this.map.geoObjects.remove(point);
    }

    createPoint (pos) {
        const point = new ymaps.Placemark(this.convectPosObjectToArray(pos));
        this.map.geoObjects.add(point);

        return point;
    }

    addCircle (pos, radius, measurementError = 0) {
        this.radius = radius;
        if (pos) {
            this.deleteCircle(this.circle);
            pos.latitude += this.randomInRange(0.00001, measurementError);
            pos.longitude += this.randomInRange(0.00001, measurementError);
            this.circle = this.createCircle(pos, radius);
        }
    }

    deleteCircle (circle) {
        this.map.geoObjects.remove(circle);
    }

    createCircle (pos, radius) {
        const circle = new ymaps.Circle([this.convectPosObjectToArray(pos), radius]);
        this.map.geoObjects.add(circle);

        return circle;
    }

    randomInRange (min, max) {
        return Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
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
