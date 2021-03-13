export const renderStoreView = window.Handlebars.compile(`
    <div id="store-container">
        <div id="store-main">
            <div id="store-title"></div>
            <div id="food-list"></div>
        </div>

        <div id="store-basket"></div>
    </div>
`)
