import { NavBar } from '../../components/NavBar/NavBar.js';
import { renderProfileView } from './profileTemplate.js'
import { ProfileEdits } from '../../components/Profile/ProfileEdits.js';
import { userGet } from '../../modules/api.js';

export class ProfileView {
    constructor (root, router) {
        this.router = router;
        this.root = root;
    }

    render () {
        userGet()
            .then(r => this.userDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /user from ${r}`));
    };

    userDraw (data, status) {
        console.log(data);
        if (status === 200) {
            this.root.innerHTML = '';
            this.navbar = new NavBar(this.root);

            const profile = document.createElement('div');
            profile.innerHTML = renderProfileView({}); // создаем правое меню
            this.root.append(profile);

            // добавляем поля профиля и его изменения
            const edits = new ProfileEdits(this.router, data);
            edits.render()
        }
    }
}
