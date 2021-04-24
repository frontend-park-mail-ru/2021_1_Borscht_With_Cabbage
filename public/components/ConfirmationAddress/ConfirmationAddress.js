import renderConfirmation from './ConfirmationAddressTmpl.hbs';
import renderConfirmationAuth from './CofimationAddressAuth.hbs';
import renderConfirmationNotAuth from './CofimationAddressNotAuth.hbs';

export class ConfirmationAddress {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
    }

    render (auth = false, addresses = []) {
        const confirmationItem = document.createElement('div');
        confirmationItem.innerHTML += renderConfirmation();
        this.root.append(confirmationItem);
        if (auth) {
            confirmationItem.querySelector('.confirmation-address-container')
                .insertAdjacentHTML('beforeend', renderConfirmationAuth({
                    addresses
                }));

            confirmationItem.querySelector('#js__add-new-address')
                .addEventListener('click', () => {
                    if (!document.getElementById('js__map-add-address')) {
                        confirmationItem.querySelector('#js__add-new-address')
                            .insertAdjacentHTML('afterend', renderConfirmationNotAuth());
                    }
                });
        } else {
            confirmationItem.querySelector('.confirmation-address-container')
                .insertAdjacentHTML('beforeend', renderConfirmationNotAuth());
        }


        this.addCloseConfirmationEventListeners(confirmationItem);
    }

    addCloseConfirmationEventListeners (confirmationItem) {
        const close = this.root.querySelector('.confirmation-address');
        if (!close) {
            return;
        }

        close.addEventListener('click', e => {
            if (e.target === close) {
                confirmationItem.remove();
            }
        });
    }
}