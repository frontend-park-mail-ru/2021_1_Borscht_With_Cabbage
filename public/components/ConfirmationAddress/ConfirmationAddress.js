import './ConfirmationAddress.less';
import renderConfirmation from './ConfirmationAddressTmpl.hbs';
import eventBus from '../../modules/eventBus.js';
import { AuthEvents } from '../../events/AuthEvents.js';
import { noop } from '../../modules/utils.js';
import { YandexMap } from '../../modules/yandexMap.js';
import address from 'Modules/address.js';

export class ConfirmationAddress {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.longitude = 0.0;
        this.latitude = 0.0;
        this.setCoords = this.setCoords.bind(this);
    }

    setCoords (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    render (redirect = 'main') {
        const confirmationItem = document.createElement('div');
        confirmationItem.innerHTML += renderConfirmation();
        this.root.append(confirmationItem);
        this.yaMap = new YandexMap();
        this.yaMap.render({ id: 'js__map', isStatic: false }, (address, isRenew) => {
            if (isRenew) {
                document.getElementById('js__map-add-address').value = address.name;
            }
            this.setCoords(address.latitude, address.longitude);
        });
        this.yaMap.addSearch('js__map-add-address');
        const address_ = address.getAddress();
        if (address_.name) {
            document.getElementById('js__map-add-address').value = address_.name;
            this.yaMap.addPointCustom(address_);//{ longitude: address_.longitude, latitude: address_.latitude });
        }
        this.addCloseConfirmationEventListeners(confirmationItem, redirect);
    }

    addCloseConfirmationEventListeners (confirmationItem, redirect) {
        const close = this.root.querySelector('.confirmation-address');
        const iconeClose = this.root.querySelector('.icone-close');
        if (!close || !iconeClose) {
            return;
        }

        close.querySelector('#js__add-new-address__btn')
            .addEventListener('click', () => {
                YandexMap.isAddressCorrect(document.getElementById('js__map-add-address').value)
                    .then(isCorrect => {
                        if (isCorrect) {
                            const address = document.getElementById('js__map-add-address');
                            if (address.value) {
                                eventBus.emit(AuthEvents.changeActiveAddress, {
                                    longitude: this.longitude,
                                    latitude: this.latitude,
                                    name: address.value
                                });
                                confirmationItem.remove();
                                this.goTo(redirect);
                            } else {
                                // TODO показать ошибку, валидировать адрес
                            }
                        }
                    })
                    .catch(noop);
            });

        close.addEventListener('click', e => {
            if (e.target === close || e.target === iconeClose) {
                confirmationItem.remove();
            }
        });

        // addEventListener("keyup", function(event) {
        //     console.log(event)
        //     if (event.keyCode == 27)
        //         confirmationItem.remove();
        // });
    }
}
