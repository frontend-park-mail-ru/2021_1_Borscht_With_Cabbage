export const renderStoreView = window.Handlebars.compile(`
    <div class="store">
        <div id="store-info">
            <div id="store-info__title"></div>
            <div id="store-info__food"></div>
        </div>

        <div id="store-basket"></div>
    </div>
`)