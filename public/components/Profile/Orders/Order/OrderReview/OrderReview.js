import { ProfileController } from "../../../../../controllers/ProfileController.js";
import eventBus from "../../../../../modules/eventBus";
import { ProfileEvents } from "../../../../../events/ProfileEvents.js";
import renderOrderReview from "./OrderReview.hbs"
import renderOrderReviewInput from "./OrderReviewEdit.hbs"

export class OrderReview {
    constructor ({
        root = document.body,
        order = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.order = order
        this.controller = controller;
        // eventBus.on(ProfileEvents.profileOrderGetReviewSuccess, this.reviewDraw.bind(this))
        // eventBus.on(ProfileEvents.profileOrderGetReviewNoReview, this.reviewEditDraw.bind(this))
        // eventBus.on(ProfileEvents.profileOrderGetReviewFailed, this.loadError.bind(this))
    }

    render() {
        console.log(this.order.review)
        if (this.order.review === "") {
            this.reviewEditDraw()
        } else {
            this.reviewDraw()
        }
    }

    reviewDraw() {
        const review = document.getElementById('reviewPlace-' + this.order.orderID)
        console.log(review)
        review.innerHTML = renderOrderReview({ order: this.order })
    }

    reviewEditDraw() {
        const review = document.getElementById('reviewPlace-' + this.order.orderID)
        review.innerHTML = renderOrderReviewInput({ order: this.order })

        const sendReview = document.getElementById('send_review-' + this.order.orderID)
        sendReview.addEventListener('click', this.addReviewListener.bind(this))
    }

    addReviewListener(event) {
        event.preventDefault()
        const sendReview = document.getElementById('send_review-' + this.order.orderID)
        let starsCount = 0
        let stars = document.querySelectorAll('.order-'+this.order.orderID)
        stars.forEach(function (star){
            if (star.checked) {
                starsCount = star.value
            }
        })
        sendReview.style.backgroundColor = "#C4C4C4"
        sendReview.disabled = true

        const review = document.getElementById('review-' + this.order.orderID).value
        this.controller.postReview(this.order.orderID, review, starsCount)
    }
}