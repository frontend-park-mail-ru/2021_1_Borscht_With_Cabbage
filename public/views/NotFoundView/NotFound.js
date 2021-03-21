import { NavBar } from "../../components/NavBar/NavBar.js";

export class NotFound {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        console.log(data);
        this.root.innerHTML = '';
        this.navbar = new NavBar({ root: this.root });

        const profile = document.createElement('div');
        profile.innerHTML = "Not Found"
        //profile.innerHTML = renderProfileView({}); // создаем правое меню
        this.root.append(profile);
        }
}
