import renderStoreTitle from './StoreTitleTmpl.hbs';
import { StoreReviews } from "../StoreReviews/StoreReviews.js";
import { I18n } from "../../../modules/intlApi.js";

export class StoreTitle {
    constructor ({
        root = document.body,
        store,
        controller
    } = {}) {
        this.root = root;
        this.store = store;
        this.controller = controller
    }

    render () {
        this.root.innerHTML = renderStoreTitle({
            name: this.store.title,
            rating: this.store.rating.toString(),
            deliveryCost: this.store.deliveryCost.toString(),
            deliveryTime: '60', // TODO
            image: this.store.avatar
        });
        this.storeReviews = new StoreReviews(
            this.root,
            this.store,
            this.controller,
        )

        const reviews = document.getElementById('reviews')
        reviews.addEventListener('click', this.checkReviews.bind(this))
    }

    checkReviews(event) {
        event.preventDefault()
        this.storeReviews.render()
    }
}
