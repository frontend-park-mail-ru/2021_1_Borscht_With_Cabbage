import renderConfirmation from './ConfirmationAddressTmpl.hbs';
import eventBus from '../../modules/eventBus.js';
import { AuthEvents } from '../../events/AuthEvents.js';
import { noop } from '../../modules/utils.js';

class ConfirmationAddress {
    constructor () {
    }

    setParams ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        eventBus.on(AuthEvents.wantToChangeActiveAddress, this.render.bind(this));
    }

    render () {
        const confirmationItem = document.createElement('div');
        confirmationItem.innerHTML += renderConfirmation();
        this.root.append(confirmationItem);

        this.addCloseConfirmationEventListeners(confirmationItem);
    }

    addCloseConfirmationEventListeners (confirmationItem) {
        const close = this.root.querySelector('.confirmation-address');
        if (!close) {
            return;
        }

        close.querySelector('#js__add-new-address__btn')
            .addEventListener('click', () => {
                const address = document.getElementById('js__map-add-address');
                if (address.value) {
                    eventBus.emit(AuthEvents.changeActiveAddress, {
                        longitude: '37.546',
                        latidude: '58.908',
                        name: address.value
                    });
                    this.goTo('main');
                } else {
                    // TODO показать ошибку, валидировать адрес
                }
            })

        close.addEventListener('click', e => {
            if (e.target === close) {
                confirmationItem.remove();
            }
        });
    }
}

export default new ConfirmationAddress()
