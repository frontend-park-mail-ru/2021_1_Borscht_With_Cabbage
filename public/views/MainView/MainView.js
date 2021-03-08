import { renderMainView } from './mainTemplate.js';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { mainGet } from '../../modules/api.js';

export class MainView {
    constructor (root, route) {
        this.route = route;
        this.root = root;
    }

    render () {
       mainGet()
            .then(r => this.mainPageDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /main from ${r}`));
    }

    mainPageDraw (info, status) {
        if (status === 200) {
            this.root.innerHTML = '';
            this.navbar = new NavBar(this.root);
            const main = document.createElement('div');
            main.innerHTML = renderMainView(info);
            this.root.append(main);
        } else {
            this.route('login');
        }
    }
}
