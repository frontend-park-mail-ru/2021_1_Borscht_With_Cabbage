export const renderConfirmation = window.Handlebars.compile(`
<div class="confirmation">
    <div class="confirmation-container">
        <h2 class="menu-container__title">Вы действительно хотите удалить?</h2>
        <span class="confirmation-success">Да</span>
        <span class="confirmation-failed">Нет</span>
    </div>
</div>
`)