import RenderStoreReviewsContainer from './StoreReviews.hbs'
import RenderStoreReview from './StoreReview.hbs'
import { StoreController } from '../../../controllers/StoreController.js';
import eventBus from '../../../modules/eventBus.js';
import { StoreEvents } from '../../../events/StoreEvents.js';
import { I18n } from "../../../modules/intlApi";

export class StoreReviews {
    constructor (root, store, controller) {
        this.root = root;
        this.store = store;
        this.controller = controller;
        eventBus.on(StoreEvents.storeGetReviewsSuccess, this.renderReviews.bind(this))
        eventBus.on(StoreEvents.storeGetReviewsFailed, this.loadError.bind(this))
    }

    render() {
        console.log("445")
        this.controller.getReviews(this.store.id)
    }

    renderReviews(reviews) {
        const i18n = new I18n()
        console.log("rendering")
        console.log('root '+this.root)
        this.root.insertAdjacentHTML('beforeend', RenderStoreReviewsContainer({}))
        //this.root.innerHTML  = RenderStoreReviewsContainer({})
        console.log('root ',this.root)

        let reviewsContainer = document.getElementById('reviews_container')
        console.log('reviews_container ', reviewsContainer)
        console.log('root ',this.root)
        reviews.forEach( function (review) {
                reviewsContainer.insertAdjacentHTML('beforeend', RenderStoreReview({
                user: review.user,
                review: review.review,
                time: i18n.formatDateTime(review.deliveryTime),
                stars: review.stars}),
            )
        })
    }

    loadError(err) {
        console.log('error while getting restaurant reviews:' + err)
    }
}