import './Preview.less';
import renderPreview from './PreviewTmpl.hbs';
import { bytesToSize } from 'Modules/utils.js';

export class Preview {
    constructor ({
        root = document.body,
        input = null,
        button = null
    } = {}) {
        this.root = root;
        this.file = null;
        this.input = input;
        this.button = button;
    }

    setPreview () {
        this.file = null
        const changeHandler = event => {
            if (!event.target.files.length) {
                return;
            }

            const preview = this.root.querySelector('#profile-preview');
            if (preview) {
                preview.innerHTML = '';
            }

            this.file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = ev => {
                this.input.insertAdjacentHTML('afterend', renderPreview({
                    src: ev.target.result,
                    name: this.file.name,
                    size: bytesToSize(this.file.size)
                }));
                this.root.querySelector('.input-avatar__preview-remove')
                    .addEventListener('click', () => {
                        this.deletePreview()
                    });
            };
            reader.readAsDataURL(this.file);
        };

        const triggerInput = () => this.input.click();

        this.button.addEventListener('click', triggerInput);
        this.input.addEventListener('change', changeHandler);
    }

    deletePreview () {
        const elemPreview = this.root.querySelector('.input-avatar__preview');
        if (elemPreview) {
            elemPreview.classList.add('removing');
            elemPreview.addEventListener('transitionend', () => elemPreview.remove());
        }
        this.file = null;
    }

    getFile () {
        return this.file;
    }
}
