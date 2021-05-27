import RenderStoreReviewsContainer from './StoreReviews.hbs'
import RenderStoreReview from './StoreReview.hbs'
import eventBus from 'Modules/eventBus.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { I18n } from 'Modules/intlApi';

export class StoreReviews {
    constructor (root, store, controller) {
        this.root = root;
        this.store = store;
        this.controller = controller;
        eventBus.on(StoreEvents.storeGetReviewsSuccess, this.renderReviews.bind(this))
        eventBus.on(StoreEvents.storeGetReviewsFailed, this.loadError.bind(this))
    }

    render () {
        this.controller.getReviews(this.store.id)
    }

    renderReviews (reviews) {


        const i18n = new I18n()
        if (!this.root.querySelector('#store-reviews')) {

            this.root.insertAdjacentHTML('beforeend', RenderStoreReviewsContainer({}))
        }
        let reviewsContainer = this.root.querySelector('#reviews_container')

        if (reviews.length === 0) {
            reviewsContainer.insertAdjacentHTML('beforeend', "Отзывов пока нет, но вы можете быть первым!")
        } else {
            reviews.forEach((review) => {
                reviewsContainer.insertAdjacentHTML('beforeend', RenderStoreReview({
                        user: review.user,
                        review: review.review,
                        time: i18n.formatDateTime(review.deliveryTime),
                        stars: review.stars
                    }),
                )
            })
        }

        document.addEventListener('click', this.closeReviews.bind(this))
    }

    closeReviews (event) {
        let reviewsContainer = document.getElementById('reviews_container');
        if (reviewsContainer) {
            if (!reviewsContainer.contains(event.target)) {
                const reviews = document.getElementById('store-reviews');
                reviews.remove()
            }
        }
        document.removeEventListener('click', this.closeReviews.bind(this))
    }

    loadError (err) {
        console.log('error while getting restaurant reviews:' + err)
    }
}