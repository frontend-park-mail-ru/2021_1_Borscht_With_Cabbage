import { ajaxGet } from '../../modules/http.js';
import { renderMainView } from './mainTemplate.js';
import { navbar } from '../../components/NavBar/NavBar.js';

export class MainView {
    constructor (root, router) {
        this.router = router;
        this.root = root;
        this.render = this.render.bind(this);
    }

    render () {
        ajaxGet({ url: '/main' })
            .then(r => this.mainPageDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /main from ${r}`));
    }

    mainPageDraw (info) {
        this.root.innerHTML = '';
        navbar({ auth: true }, this.root);
        const main = document.createElement('div');
        main.innerHTML = renderMainView(info);
        this.root.append(main);
    }
}
