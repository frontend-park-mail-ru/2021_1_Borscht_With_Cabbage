export const renderRestaurantAddingSection = window.Handlebars.compile(`
<div class="adding-section" >
    <div class="adding-section-container" style="margin: 50px 0">
        <h2 class="adding-section-container__title">{{buttonName}}</h2>
        <form id="adding-section-form">
            <input type="text" id="name" placeholder="Название раздела" name="name" data-name="Name" value="{{section.name}}">
            <p id="nameError" class="error">Название раздела</p>
            
            <input type="submit" class="button" value="{{buttonName}}">
            <p id="serverError" class="error"> </p>
        </form>
    </div>
</div>
`)
