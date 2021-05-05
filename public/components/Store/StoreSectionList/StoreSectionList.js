import renderSectionList from './StoreSectionListTmpl.hbs';
import renderSection from './StoreSectionTmpl.hbs';
import { StoreFoodList } from '../StoreFoodList/StoreFoodList.js';
import { StoreController } from '../../../controllers/StoreController.js';

export class StoreSectionList {
    constructor ({
        root = document.body,
        info = {},
        controller = new StoreController({ root })
    } = {}) {
        this.root = root;
        this.info = info;
        this.foods = info.foods;
        this.sections = info.sections;
        this.foodList = [];
        this.controller = controller;
    }

    render () {
        this.root.innerHTML = renderSectionList({});
        this.sectionFoods = [];
        for (const section of this.sections) {
            this.sectionFoods.push(this.getFoodsInSection(section.id, this.foods));
        }

        for (const section of this.sections) {
            if (this.getListFoodFromSection(section, this.sectionFoods)) {
                this.root.querySelector('#store__section-list')
                    .insertAdjacentHTML('beforeend', renderSection({ section: section }));
            }
        }

        for (const section of this.sections) {
            const rootSection = this.root.querySelector(`[data-section-id="${section.id}"]`);
            console.log(rootSection)
            if (rootSection) {
                const sectionFoods = new StoreFoodList({
                    root: rootSection,
                    info: this.info,
                    foods: this.getListFoodFromSection(section, this.sectionFoods),
                    controller: this.controller
                });
                this.foodList.push(sectionFoods);
                sectionFoods.render();
            }
        }
    }

    getFoodsInSection (sectionID, foodList) {
        const sectionFoods = [];
        for (const food of foodList) {
            if (food.section === sectionID) {
                sectionFoods.push(food);
            }
        }
        return sectionFoods;
    }

    getListFoodFromSection (section, sections) {
        for (const sec of sections) {
            if (sec.length > 0) {
                if (sec[0].section === section.id) {
                    console.log(sec)
                    return sec;
                }
            }
        }
        return null;
    }
}
