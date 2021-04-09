import { renderConfirmation } from './ConfirmationTmpl.js';
import eventBus from '../../modules/eventBus.js';
import { ConfirmationEvents } from '../../events/ConfirmationEvents.js'

export class ConfirmationComponent {
    constructor ({
        root = document.body,
        id = 0
    } = {}) {
        this.root = root;
        this.id = id;
    }

    render () {
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