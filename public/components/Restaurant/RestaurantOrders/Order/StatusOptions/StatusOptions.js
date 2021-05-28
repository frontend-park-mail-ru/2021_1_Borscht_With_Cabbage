import { I18n } from "../../../../../modules/intlApi.js";

export class StatusesComponent {
    constructor ({
        root = document.body,
        controller
    } = {}) {
        this.root = root;
        this.controller = controller;
    }

    render (order) {
        const i18n = new I18n();
        const deliveryTime = document.getElementById(
            'delivery_time-' + order.orderID
        );
        if (deliveryTime) {
            deliveryTime.value = i18n.formatInDateTimeInput(order.deliveryTime);
        }

        const status = document.getElementById('status-' + order.orderID);
        switch (order.status && status) {
        case 'готовится':
            status.value = 'cooking';
            break;
        case 'едет к вам':
            status.value = 'delivering';
            break;
        case 'доставлен':
            status.value = 'done';
            break;
        default:
            status.value = 'created';
        }

        this.addStatusChangesListeners(order.orderID);
        this.addSaveListener(order.orderID);
    }

    addSaveListener (id) {
        const save = document.getElementById('save_status-' + id);
        // console.log('save ' + save);
        save.disabled = true;
        save.onclick = () => {
            const status = document.getElementById('status-' + id);
            const orderTime = document.getElementById('delivery_time-' + id);
            const statusValue = status.value;
            const orderTimeValue = orderTime.value;
            this.controller.saveStatus(statusValue, orderTimeValue, id);

            save.classList.toggle('order-state__save-enabled');
            save.classList.add('order-state__save-disabled');
            save.disabled = true;
        };
    }

    addStatusChangesListeners (id) {
        const save = document.getElementById('save_status-' + id);
        const status = document.getElementById('status-' + id);
        status.onchange = () => {
            save.classList.toggle('order-state__save-disabled');
            save.classList.add('order-state__save-enabled');
            save.disabled = false;
        };

        const deliveryTime = document.getElementById('delivery_time-' + id);
        deliveryTime.onchange = () => {
            save.classList.toggle('order-state__save-disabled');
            save.classList.add('order-state__save-enabled');
            save.disabled = false;
        };
    }
}
