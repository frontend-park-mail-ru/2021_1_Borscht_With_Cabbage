import { renderStoreTitle } from "./StoreTitleTmpl.js";

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
            rating: this.store.rating,
            deliveryCost: this.store.deliveryCost,
            deliveryTime: this.store.time,
            image: this.store.image
        });
        console.log(this.store)
    }
}
