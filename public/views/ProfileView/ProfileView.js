import {Validator} from "../../modules/validation";
import {navbar} from "../../components/NavBar/NavBar";
import { renderProfileView } from './profileTemplate'
import {ajaxGet, ajaxPut} from "../../modules/http";

export class ProfileView {
    constructor(root, router) {
        this.router = router;
        this.root = root;
        this.validator = new Validator();
        this.render = this.render.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    render() {
        ajaxGet({ url: '/user' })// нужно узнать данные пользователя перед тем как отображать страничку
            .then(r => this.userDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
        };

    userDraw(data) {
        this.root.innerHTML = '';
        navbar({auth: false}, this.root);

        const profile = document.createElement('div');

        profile.innerHTML = renderProfileView(data); // отрисовываем страничку с переданными данными

        this.root.append(profile);

        this.addErrorListeners();
        this.addSubmitListener();
    }

    addSubmitListener() {
        const formID = 'profile-form-userdata';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit);
    }

    formSubmit (event) {
        event.preventDefault();
        if (this.updateErrorsState()) {
            this.saveRequest();
        }
    }

    updateErrorsState () {
        return this.validator.validateEmail().result *
            this.validator.validatePassword().result;
    }

    saveRequest () {
        const emailInput = document.getElementById('email');
        const nameInput = document.getElementById('name');
        const numberInput = document.getElementById('number');
        // const passwordInput = document.getElementById('password');

        const email = emailInput.value.trim()
        const name = nameInput.value.trim()
        const number = numberInput.value.trim()

        ajaxPut({
            url: '/user',
            body: { email, number, name  }
        })
            .then(r => this.router.open('/user'))
            .catch(r => console.log('Error in data saving'));
    }

    addErrorListeners () {
    // TODO
    }
}


// function profilePage (root) {
//     root.innerHTML = '';
//     navbar({ auth: true }, root);
//     const container = document.createElement('div');
//     container.innerHTML = renderProfileView({});
//     root.append(container);
//
//     // TODO read that element user choose instead of this idiot switch
//     // TODO make plug on server instead of plug here
//     // TODO make option to change user data (server request etc)
//     const choose = 1;
//     const mainBlock = document.getElementById('profile-main_block');
//     switch (choose) {
//     case 0: {
//         mainBlock.innerHTML = renderProfileUserdataView({});
//
//         const form = document.getElementById('profile-form-userdata');
//         form.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//
//             const emailInput = document.getElementById('edit-login');
//             const passwordInput = document.getElementById('edit-password');
//
//             const email = emailInput.value.trim();
//             const password = passwordInput.value.trim();
//
//             ajaxPost({
//                     url: '/edit',
//                     body: { email, password }
//                 }
//             )
//                 .then(r => profilePage())
//                 .catch(r => console.log(`THis crash when post /edit from ${r}`));
//         });
//         break;
//     }
//     case 1: {
//         mainBlock.innerHTML = renderProfileOrdersView({
//             order: [
//                 'McDonalds',
//                 'KFC',
//                 'BurgerKing'
//             ]
//         });
//         break;
//     }
//     case 2: {
//         mainBlock.innerHTML = renderProfileChatsView({
//             chat: [
//                 'McDonalds',
//                 'KFC',
//                 'BurgerKing'
//             ]
//         });
//         break;
//     }
//     default: {
//         break;
//     }
//     }
//
//     root.append(container)
// }
