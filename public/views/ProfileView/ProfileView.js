import { NavBar } from '../../components/NavBar/NavBar.js';
import { renderProfileView } from './profileTemplate.js'
import { ajaxGet } from '../../modules/http.js';
import { ProfileEdits } from '../../components/Profile/ProfileEdits.js';

export class ProfileView {
    constructor(root, router) {
        this.router = router;
        this.root = root;
    }

    render() {
        ajaxGet({url: '/userProfile'})// нужно узнать данные пользователя перед тем как отображать страничку
            .then(r => this.userDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
    };

    userDraw(data) {
        this.root.innerHTML = '';
        this.navbar = new NavBar(this.root);

        const profile = document.createElement('div');
        profile.innerHTML = renderProfileView(this); // создаем правое меню
        this.root.append(profile);


        // добавляем поля профиля и его изменения
        const edits = new ProfileEdits(this.router, data);
        edits.render()
    }
}
