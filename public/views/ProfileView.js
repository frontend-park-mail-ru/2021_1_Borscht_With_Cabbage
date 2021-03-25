import { renderProfileView } from '../components/Profile/ProfileTmpl.js'
import { ProfileEdits } from '../components/Profile/ProfileEdits/ProfileEdits.js';
import { userGet } from '../modules/api.js';

export class ProfileView {
    constructor (root, goTo) {
        this.goTo = goTo;
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

            const profile = document.createElement('div');
            profile.innerHTML = renderProfileView({}); // создаем правое меню
            this.root.append(profile);

            // добавляем поля профиля и его изменения
            const edits = new ProfileEdits({ root: this.root, goTo: this.goTo, user: data });
            edits.render()
        }
    }
}
