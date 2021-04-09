export const renderSection = window.Handlebars.compile(`

<div class="section" data-section-id="{{section.sectionId}}">
    <div class="section-container" >
        <h2 class="section-container__title">{{section.sectionName}}</h2>
        <ul class="section-container__content horizontal-list" data-section-list-id="{{section.sectionId}}"></ul>
    </div>
</div>

`)
