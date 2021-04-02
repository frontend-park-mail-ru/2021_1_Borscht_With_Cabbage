export const renderStoreView = window.Handlebars.compile(`
    <div class="restaurant">
        <div id="restaurant-info">
            <div id="restaurant-info__title"></div>
            <div id="restaurant-info__food"></div>
        </div>

        <div id="restaurant-basket"></div>
    </div>
`)
