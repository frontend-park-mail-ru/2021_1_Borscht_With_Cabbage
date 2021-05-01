import eventBus from 'Modules/eventBus.js';
import { AuthEvents } from 'Events/AuthEvents.js';
import renderToastMessage from './ToastTmpl.hbs';

export class Toast {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
        eventBus.on(AuthEvents.offline, this.render.bind(this));
    }

    render ({ message }) {
        console.log(message, this.root);
        if (!this.root.querySelector('.toast')) {
            this.root.insertAdjacentHTML('beforeend', renderToastMessage({
                message: message
            }));
        }
        const toast = this.root.querySelector('.toast');
        (async () => {
            setTimeout(() => {
                toast.classList.add('removing');
                toast.addEventListener('transitionend', () => toast.remove());
            }, 5000);
        })();

    }
}
