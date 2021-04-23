import { RestaurantMainController } from "../../../../../controllers/RestaurantMainController";

export class StatusesComponent {
    constructor ({
        root = document.body,
        i18n = null,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.i18n = i18n;
        this.controller = controller;
    }

    render (order) {
        let deliveryTime = document.getElementById('delivery_time-'+order.orderID)
        deliveryTime.value = this.i18n.formatInDateTimeInput(order.deliveryTime)

        let status = document.getElementById('status-'+order.orderID)
        switch (order.status) {
        case 'готовится':
            status.value = 'cooking'
            break
        case 'едет к вам':
            status.value = 'delivering'
            break
        case 'доставлен':
            status.value = 'done'
            break
        default:
            status.value = 'created'
        }

        this.addStatusChangesListeners(order.orderID)
        this.addSaveListener(order.orderID)
    }

    addSaveListener(id) {
        const save = document.getElementById('save_status-' + id)
        console.log("save " + save)
        save.disabled = true
        save.onclick = () => {
            let status = document.getElementById('status-' + id)
            let orderTime = document.getElementById('delivery_time-' + id)
            let statusValue = status.value
            let orderTimeValue = orderTime.value
            this.controller.saveStatus(statusValue, orderTimeValue, id)

            save.style.backgroundColor = "#C4C4C4"
            save.disabled = true
        }
    }

    addStatusChangesListeners(id) {
        const save = document.getElementById('save_status-' + id)

        const status = document.getElementById('status-' + id)
        status.onchange = () => {
            console.log("sdssdfsfsfsf")
            save.style.backgroundColor = "#97B498"
            save.disabled = false
            save.style.cursor = 'pointer'
        }

        const deliveryTime = document.getElementById('delivery_time-' + id)
        deliveryTime.onchange = () => {
            save.style.backgroundColor = "#97B498"
            save.disabled = false
            save.style.cursor = 'pointer'
        }
    }
}