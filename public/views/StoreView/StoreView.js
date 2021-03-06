import { ajaxGet } from '../../modules/http.js';
import { renderStoreView } from './storeTemplate.js';
import { navbar } from '../../components/NavBar/NavBar.js';

export class StoreView {
    constructor (root, router) {
        this.router = router;
        this.root = root;
        this.render = this.render.bind(this);
    }

    render () {
        ajaxGet({ url: '/store' })
            .then(r => this.storePageDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
    }

    storePageDraw (info) {
        this.root.innerHTML = '';
        navbar({ auth: true }, this.root);
        const main = document.createElement('div');
        main.innerHTML = renderStoreView(info);
        this.root.append(main);
    }
}
