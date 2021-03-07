export const renderStoreView = window.Handlebars.compile(`
    <div id="store-container">
        <div id="store-main">
            {{> storeTitle this.title }}
            {{> foodList this }}
        </div>

        {{> storeBasket this }}
    </div>
`)
