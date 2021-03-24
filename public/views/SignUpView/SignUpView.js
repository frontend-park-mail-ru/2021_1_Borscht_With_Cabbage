import { NavBar } from '../../components/NavBar/NavBar.js';
import { SignUp } from '../../components/SignUp/SignUp.js';

export class SignUpView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        if (window.isUserAuth) {
            this.goTo('main')
        }
        this.root.innerHTML = '';
        this.navbar = new NavBar({ root: this.root });

        const signup = new SignUp({
            root: this.root,
            goTo: this.goTo
        });
        signup.render()
    }
}
