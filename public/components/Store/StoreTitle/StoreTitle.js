import renderStoreTitle from './StoreTitleTmpl.hbs';

export class StoreTitle {
    constructor ({
        root = document.body,
        store
    } = {}) {
        this.root = root;
        this.store = store;
    }

    render () {
        this.root.innerHTML = renderStoreTitle({
            name: this.store.title,
            rating: this.store.rating.toString(),
            deliveryCost: this.store.deliveryCost.toString(),
            deliveryTime: '60', // TODO
            image: this.store.avatar
        });
    }
}
