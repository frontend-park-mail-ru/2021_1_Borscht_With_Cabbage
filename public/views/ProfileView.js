import { renderProfileView } from '../components/Profile/ProfileTmpl.js'
import { ProfileController } from '../controllers/ProfileController.js';
import { RightMenu } from "../components/Profile/RightMenu/RightMenu.js";
import { Orders } from "../components/Profile/Orders/Orders.js";
import { ProfileEdits } from '../components/ProfileEdits/ProfileEdits.js';
import { userGet } from '../modules/api.js';

export class ProfileView {
    constructor (root, goTo) {
        this.goTo = goTo
        this.root = root
        this.profileController = new ProfileController()
    }

    render () {
        this.profileDraw()
    }

    profileDraw () {
        this.root.innerHTML = ''

        const profile = document.createElement('div')
        profile.innerHTML = renderProfileView({}) // создаем правое меню
        this.root.append(profile)

        const edits = new ProfileEdits({
            root: this.root,
            goTo: this.goTo,
            controller: this.profileController
        })

        const orders = new Orders({
            root: this.root,
            goTo: this.goTo,
            controller: this.profileController
        })

        const rightMenu = new RightMenu({
            root: this.root,
            profileController: this.profileController,
            editsView: edits,
            ordersView: orders
        })
        rightMenu.render()

        // добавляем поля профиля и его изменения тк первое что появляется - они
        edits.render()
    }
}
