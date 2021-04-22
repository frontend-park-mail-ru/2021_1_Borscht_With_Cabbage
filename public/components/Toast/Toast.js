import renderToastMessage from './ToastTmpl.hbs';

export class Toast {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
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
            }, 3000);
        })();

    }
}
