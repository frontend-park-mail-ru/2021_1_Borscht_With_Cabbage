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
        //console.log("rooooot ", this.root)
        this.storeReviews = new StoreReviews(
            this.root,
            this.store,
            this.controller,
        )

        const reviews = document.getElementById('reviews')
        reviews.addEventListener('click', this.checkReviews.bind(this))
        document.addEventListener('mouseup', this.closeReviews.bind(this))
    }

    checkReviews(event) {
        event.preventDefault()
        // const reviews = document.getElementById('store-reviews_review');
        // console.log(reviews)
        // if (reviews) {
        //     reviews.hidden = false
        //     console.log(reviews.hidden)
        //     return
        // }
        // console.log("rer")
        console.log('root ',this.root)

        //console.log("clicked")
        this.storeReviews.render()
    }

    closeReviews(event) {
        let reviewsContainer = document.getElementById('reviews_container');
        if (reviewsContainer) {
            if (!reviewsContainer.contains(event.target)) {
                const reviews = document.getElementById('store-reviews');
                //reviews.hidden = true
                console.log('remove')
                reviews.remove()
            }
        }
        //document.removeEventListener('click', this.closeReviews.bind(this))
    }
}
