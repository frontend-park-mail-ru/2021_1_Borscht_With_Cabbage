export const renderRestaurantAddingDish = window.Handlebars.compile(`
<div class="adding-dish" >
    <div class="adding-dish-container" style="margin: 50px 0">
        <h2 class="adding-dish-container__title">Добавить блюдо</h2>
        <form id="adding-dish-form">
            <input type="text" id="name" placeholder="Название блюда" name="name" data-name="Name">
            <p id="nameError" class="error">Название блюда</p>
            <input type="text" id="description" placeholder="Описание" name="description" data-name="Description">
            <p id="descriptionError" class="error">Описание</p>
            <input type="number" id="price" placeholder="Цена" name="price" data-name="Price">
            <p id="priceError" class="error">Цена</p>
            <input type="number" id="weight" placeholder="Вес" name="weight" data-name="Weight">
            <p id="weightError" class="error">Вес</p>
            <input type="submit" class="button" value="Добавить блюдо">
            <p id="serverError" class="error"> </p>
        </form>
    </div>
</div>
`)