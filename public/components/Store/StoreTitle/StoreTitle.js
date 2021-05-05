import './StoreTitle.less';
import renderStoreTitle from './StoreTitleTmpl.hbs';
import { noop } from '../../../modules/utils.js';
import { StoreReviews } from "../StoreReviews/StoreReviews.js";
import { I18n } from "../../../modules/intlApi.js";

export class StoreTitle {
    constructor ({
        root = document.body,
        store,
        controller,
        goTo = noop
    } = {}) {
        this.root = root;
        this.store = store;
        this.controller = controller
        this.goTo = goTo;
    }

    render () {
        console.log(this.store)
        this.root.innerHTML = renderStoreTitle({
            name: this.store.title,
            rating: this.store.rating.toString(),
            deliveryCost: this.store.deliveryCost.toString(),
            deliveryTime: '60', // TODO
            image: this.store.avatar,
            id: this.store.id,
            sections: this.store.sections
        });
        this.addEventListeners();

        this.sectionsPanel = this.root.querySelector('.sections-hrefs');
        this.startPosition = this.sectionsPanel.offsetTop;
        const func = this.sticky.bind(this);
        window.onscroll = function () {
            func();
        };
        this.storeReviews = new StoreReviews(
            this.root,
            this.store,
            this.controller,
        )

        const reviews = document.getElementById('reviews')
        reviews.addEventListener('click', this.checkReviews.bind(this))
    }

    addEventListeners () {
        const hrefs = Array.from(this.root.querySelector('.sections-hrefs').children);
        hrefs.forEach(value => {
            value.addEventListener('click', () => {
                const href = value.href.substr(value.href.lastIndexOf('#') + 1);
                const scrollTarget = document.getElementById(href);
                const topOffset = value.offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    checkReviews(event) {
        event.preventDefault()
        this.storeReviews.render()
    }

    sticky () {
        if (window.pageYOffset >= this.startPosition) {
            this.sectionsPanel.classList.add('sticky');
        } else {
            this.sectionsPanel.classList.remove('sticky');
        }
    }
}
