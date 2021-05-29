import './Chose.less';
import './ChoseList/ChoseList.less';
import './ChoseTable/ChoseTable.less';
import renderChoseList from './ChoseList/ChoseListTmpl.hbs';
import renderChoseTable from './ChoseTable/ChoseTableTmpl.hbs';
import renderEmpty from './EmptyTmpl.hbs';
import { noop } from 'Modules/utils';
import { ChoseController } from 'Controllers/ChoseController';

export class ChoseComponent {
    constructor ({
        goTo = noop,
        controller = new ChoseController({ goTo })
    }) {
        this.goTo = goTo;
        this.controller = controller;
    }

    getMax (baskets, option) {
        let param = -1;
        baskets.forEach(basket => {
           if (param < basket[option]) {
               param = basket[option];
           }
        });

        return param;
    }

    getMin (baskets, option) {
        let param = 999999;
        baskets.forEach(basket => {
            if (param > basket[option]) {
                param = basket[option];
            }
        });

        return param;
    }

    colorOption ({
        baskets = [],
        option = '',
        dataOption = '',
        maxGood = true
    }) {
        if (maxGood) {
            let minTheme = 'bad';
            let maxTheme = 'good';
            const min = this.getMin(baskets, option);
            const minBlocks = this.root.querySelectorAll(`[data-${dataOption}="${min}"]`);
            minBlocks?.forEach(block => {
                block.classList.add(`chose-table__${minTheme}`)
                block.classList.remove(`chose-table__default`);
            });
            const max = this.getMax(baskets, option);
            const maxBlocks = this.root.querySelectorAll(`[data-${dataOption}="${max}"]`);
            maxBlocks?.forEach(block => {
                block.classList.remove(`chose-table__${minTheme}`);
                block.classList.remove(`chose-table__default`);
                block.classList.add(`chose-table__${maxTheme}`);
            });
        }
        if (!maxGood) {
            let minTheme = 'good';
            let maxTheme = 'bad';
            const max = this.getMax(baskets, option);
            const maxBlocks = this.root.querySelectorAll(`[data-${dataOption}="${max}"]`);
            maxBlocks?.forEach(block => {
                block.classList.add(`chose-table__${maxTheme}`)
                block.classList.remove(`chose-table__default`);
            });
            const min = this.getMin(baskets, option);
            const minBlocks = this.root.querySelectorAll(`[data-${dataOption}="${min}"]`);
            minBlocks?.forEach(block => {
                block.classList.remove(`chose-table__${maxTheme}`);
                block.classList.remove(`chose-table__default`);
                block.classList.add(`chose-table__${minTheme}`);
            });
        }

    }

    colorAllOptions (baskets) {
        this.colorOption({
            baskets,
            option: 'totalFoods',
            dataOption: 'realtotalfoods',
            maxGood: true
        });
        this.colorOption({
            baskets,
            option: 'totalCalo',
            dataOption: 'realtotalcalo',
            maxGood: true
        });
        this.colorOption({
            baskets,
            option: 'totalPrice',
            dataOption: 'realtotalprice',
            maxGood: false
        });
        this.colorOption({
            baskets,
            option: 'totalWeight',
            dataOption: 'realtotalweight',
            maxGood: true
        });
        this.colorOption({
            baskets,
            option: 'deliveryPrice',
            dataOption: 'realdeliveryprice',
            maxGood: false
        });
        this.colorOption({
            baskets,
            option: 'deliveryTime',
            dataOption: 'realdeliverytime',
            maxGood: false
        });
    }

    render (root, baskets, isList) {
        this.root = root;
        if (baskets?.length < 1) {
            this.root.innerHTML = renderEmpty();
            return;
        }
        if (isList) {
            this.root.innerHTML = renderChoseList({ baskets });
        } else {
            this.root.innerHTML = renderChoseTable({ baskets });
            this.colorAllOptions(baskets);
        }

        const deleteButtons = this.root.querySelectorAll('[data-button="delete"]');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.controller.deleteBasket(button.dataset.id);
                this.root
                    .querySelectorAll(`[data-deleteID="${button.dataset.id}"]`)
                    ?.forEach(el => el.remove());
            });
        });

        const orderButtons = this.root.querySelectorAll('[data-button="order"]');
        orderButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.controller.orderBasket(button.dataset.id);
            });
        });

        const storeButtons = this.root.querySelectorAll('[data-button="store"]');
        storeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.controller.goStore(button.dataset.id);
            });
        });
    }
}