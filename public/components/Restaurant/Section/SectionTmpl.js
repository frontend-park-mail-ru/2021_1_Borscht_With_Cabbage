export const renderSection = window.Handlebars.compile(`

<div class="section" data-section-id="{{section.id}}">
    <div class="section-container" >
        <div class="card__header-top">
            <span class="section-container__name">{{section.name}}</span>
            <div class="card__header-icons">
                <img src="static/edit.png" class="card__header-icon icon-edit">
                <img src="static/delete.png" class="card__header-icon icon-delete">
            </div>
        </div>
        <ul class="section-container__content horizontal-list" data-section-list-id="{{section.id}}"></ul>
    </div>
</div>

`)
