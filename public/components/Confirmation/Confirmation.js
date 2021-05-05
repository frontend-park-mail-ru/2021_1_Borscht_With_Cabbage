import './Confirmation.less';
import renderConfirmation from './ConfirmationTmpl.hbs';
import eventBus from 'Modules/eventBus.js';
import { ConfirmationEvents } from 'Events/ConfirmationEvents.js'

export class ConfirmationComponent {
    constructor () {
    }

    render ({
        root = document.body,
        id = ''
    } = {}) {
        this.root = root;
        this.id = id;

        console.log('???????????????????');
        const confirmationItem = document.createElement('div');
        confirmationItem.innerHTML += renderConfirmation();
        this.root.append(confirmationItem);

        confirmationItem.querySelector('.confirmation-success')
            .addEventListener('click', () => {
                confirmationItem.remove();
                eventBus.emit(ConfirmationEvents.confirmationSuccess + this.id);
            });

        confirmationItem.querySelector('.confirmation-failed')
            .addEventListener('click', () => {
                confirmationItem.remove();
                eventBus.emit(ConfirmationEvents.confirmationFailed + this.id);
            });

        this.addCloseConfirmationEventListeners(confirmationItem);
    }

    addCloseConfirmationEventListeners (confirmationItem) {
        const close = this.root.querySelector('.confirmation');
        if (!close) {
            return;
        }

        close.addEventListener('click', e => {
            if (e.target === close) {
                confirmationItem.remove();
                eventBus.emit(ConfirmationEvents.confirmationFailed + this.id);
            }
        })
    }
}
