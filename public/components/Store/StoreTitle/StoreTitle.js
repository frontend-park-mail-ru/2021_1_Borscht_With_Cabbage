import './StoreTitle.less';
import renderStoreTitle from './StoreTitleTmpl.hbs';
import { noop } from '../../../modules/utils.js';

export class StoreTitle {
    constructor ({
        root = document.body,
        store,
        goTo = noop
    } = {}) {
        this.root = root;
        this.store = store;
        this.goTo = goTo;
    }

    render () {
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
        this.root
            .querySelector('#js-goToChat')
            .addEventListener('click', () => {
                this.goTo(`/profile/chats/${this.store.id}`);
            });
    }

    sticky () {
        if (window.pageYOffset >= this.startPosition) {
            this.sectionsPanel.classList.add('sticky');
        } else {
            this.sectionsPanel.classList.remove('sticky');
        }
    }
}
