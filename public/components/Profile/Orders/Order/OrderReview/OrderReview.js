import { ProfileController } from 'Controllers/ProfileController.js';
import renderOrderReview from './OrderReview.hbs';
import renderOrderReviewInput from './OrderReviewEdit.hbs';

export class OrderReview {
    constructor ({
        root = document.body,
        order = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.order = order;
        this.controller = controller;
    }

    render () {
        console.log(this.order.review);
        if (this.order.review === '') {
            this.reviewEditDraw();
        } else {
            this.reviewDraw();
        }
    }

    reviewDraw () {
        const review = document.getElementById('reviewPlace-' + this.order.orderID);
        if (review) {
            review.innerHTML = renderOrderReview({ order: this.order });
        }
    }

    reviewEditDraw () {
        const review = document.getElementById('reviewPlace-' + this.order.orderID);
        if (review) {
            review.innerHTML = renderOrderReviewInput({ order: this.order });
            const sendReview = document.getElementById(
                'send_review-' + this.order.orderID
            );
            sendReview.addEventListener('click', this.addReviewListener.bind(this));
        }
    }

    addReviewListener (event) {
        event.preventDefault();
        const sendReview = document.getElementById(
            'send_review-' + this.order.orderID
        );
        let starsCount = 0;
        const stars = document.querySelectorAll('.order-' + this.order.orderID);
        if (stars) {
            stars.forEach((star) => {
                if (star.checked) {
                    starsCount = star.value;
                }
            });
        }

        const review = document.getElementById(
            'review-' + this.order.orderID
        ).value;
        if (review) {
            this.order.stars = starsCount;
            this.order.review = review;
            this.reviewDraw();
            this.controller.postReview(this.order.orderID, review, starsCount);
        }
    }
}
