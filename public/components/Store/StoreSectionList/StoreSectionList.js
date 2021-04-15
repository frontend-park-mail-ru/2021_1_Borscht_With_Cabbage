import renderSectionList from './StoreSectionListTmpl.hbs';
import renderSection from './StoreSectionTmpl.hbs';
import { StoreFoodList } from '../StoreFoodList/StoreFoodList.js';

export class StoreSectionList {
    constructor ({
        root = document.body,
        info = {}
    } = {}) {
        this.root = root;
        this.info = info;
        this.foods = info.foods;
        this.sections = info.sections;
        this.foodList = [];
    }

    render () {
        this.root = renderSectionList({});
        for (const section of this.sections) {
            this.root.querySelector('#store__section-list')
                .insertAdjacentHTML('beforeend', renderSection({ sectionID: section.sectionID }));
        }

        for (const section of this.sections) {
            const rootSection = this.root.querySelector(`[data-section-id="${section.sectionID}"]`);
            if (rootSection) {
                const sectionFoods = new StoreFoodList({
                    root: rootSection,
                    info: this.info
                });
                this.foodList.push(sectionFoods);
                sectionFoods.render();
            }
        }
    }
}