import { renderConfirmation } from './ConfirmationTmpl.js';
import eventBus from '../../modules/eventBus.js';
import { ConfirmationEvents } from '../../events/ConfirmationEvents.js'

export class ConfirmationComponent {
    constructor ({
        root = document.body,
    } = {}) {
        this.root = root;
    }

    render () {
        const confirmationItem = document.createElement('div');
        confirmationItem.innerHTML += renderConfirmation();
        this.root.append(confirmationItem);

        confirmationItem.querySelector('.confirmation-success')
            .addEventListener('click', () => {
                confirmationItem.remove();
                eventBus.emit(ConfirmationEvents.confirmationSuccess);
            });

        confirmationItem.querySelector('.confirmation-failed')
            .addEventListener('click', () => {
                confirmationItem.remove();
                eventBus.emit(ConfirmationEvents.confirmationFailed);
            });
    }
}