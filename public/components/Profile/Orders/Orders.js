import eventBus from '../../../modules/eventBus.js';
import { noOp } from '../../../modules/utils.js';
import ProfileEvents from '../../../events/ProfileEvents.js';
import { ProfileController } from '../../../controllers/ProfileController.js';
import { OrderElement } from "./Order/Order.js";
import { renderOrderList } from "./OrdersListTmpt.js";

export class Orders {
    constructor ({
        root = document.body,
        goTo = noOp,
        user = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root
        this.user = user
        this.goTo = goTo
        this.controller = controller
        eventBus.on(ProfileEvents.profileGetOrdersSuccess, this.ordersDraw.bind(this))
        eventBus.on(ProfileEvents.profileGetOrdersFailed, this.loadError.bind(this))
    }

    render () {
        this.controller.getOrders()
    }

    ordersDraw(orders) {
        document.getElementById('profile-left-block').innerHTML =  renderOrderList({})
        const orderList = document.getElementById('orders-list')
        //let ordersLayout = ""
       // let ordersLayout = document.createElement('div')
       //  const profilePlace = document.getElementById('profile-left-block')
       //  let orderLayout = document.createElement('div')

        if (orders) {
            for (const order of orders) {
                console.log(order)
                const element = new OrderElement({
                    root: orderList,
                    order: order
                });
                element.render();
                // console.log("hi")
                // for (const dish of order.foods) {
                //     console.log(dish)
                //     console.log( renderDish({dish: dish}))
                //     dishBlock.innerHTML += renderDish({dish: dish})
                //     console.log("dde")
                // }
                //profilePlace.innerHTML = renderOrder({order: order})
                //console.log(ordersLayout)

                //profilePlace.innerHTML = renderOrder({order: order});
               // const orderBlock = document.getElementById('profile-left-block-order-food-list-'+order.id )
                //orderBlock.innerHTML = dishBlock
            }
        }
        //console.log(ordersLayout)
        //document.insertAdjacentText(ordersLayout, profilePlace)
        //this.root.insertBefore(ordersLayout, profilePlace)
        //profilePlace.innerHtml = ordersLayout
        //console.log(profilePlace.innerHtml)
    }

    loadError (error) {
        console.log('profileView -> GetOrders -> loadError', error)
    }
}
