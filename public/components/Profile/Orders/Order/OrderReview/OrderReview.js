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
        if (sendReview) {
            console.log("ddd")
            sendReview.addEventListener('submit', this.addReviewListener.bind(this))
        }
        //this.addReviewListener()
    }

    addReviewListener(event) {
        console.log("ddd")
        event.preventDefault()
        //const sendReview = document.getElementById('send_review-' + this.order.orderID)
        //console.log("sendReview " + sendReview)
       // sendReview.onclick = () => {
            // TODO send request
            console.log("ddd")
            let starsCount = 0
            let stars = document.querySelectorAll('.order-'+this.order.orderID)
            console.log(stars)
            for (let star of stars) {
                if (star.checked) stars++
            }
            // for (let i = 0; i <=5; i++) {
            //    // let star = document.getElementById('rating_' + i + '-' + this.order.orderID)
            //     if (star.checked) stars++
            // }
            console.log("stars "+stars)
        return false;
      //  }
    }
}