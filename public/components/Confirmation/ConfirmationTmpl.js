export const renderConfirmation = window.Handlebars.compile(`
<div class="confirmation">
    <div class="confirmation-container">
        <span class="confirmation-container__title">Вы действительно хотите удалить?</span>
        <span class="confirmation-container__btn">
            <span class="confirmation-success confirmation-btn">Да</span>
            <span class="confirmation-failed confirmation-btn">Нет</span>
        </span>
    </div>
</div>
`)