export const renderTopNavView = window.Handlebars.compile(`
<div class="navbar">
    <div class="navbar-title">
        <a class="navbar-title__project-name link" href="/">Delivery Borscht</a>
    </div>

    <div class="navbar-right-items">
        <input type="text" id="address" class="navbar-right-items__address" name="firstname" placeholder="Адрес доставки">
        <div id="auth_block" class="navbar-right-items-auth" style="float: right; margin-right: 16px"></div>
        <a href="/basket" class="navbar-right-items-basket">
            <div class="navbar-right-items-basket-container">
                <img src="../../static/cart.png" width="32" height="32" alt="Корзина" class="navbar-right-items-basket-container__image">
                <h3 class="navbar-right-items-basket-container__text link">Корзина</h3>    
            </div>
        </a>
    </div>
</div>
<div class="view" id="view-place">

</div>
`);

export const renderAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar-right-items-auth-user link" id="js_toProfile">
            <img src="{{ user.avatar }}" class="navbar-right-items-auth-user__avatar" alt="ava" id="avatar">
            <div class="navbar-right-items-auth-user__username" id="navbar-username">
                <h3>{{user.name}}</h3>
            </div>
        </h3>
`)

export const renderNotAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar-right-items-auth-user link" id="js_goLogin">
            <div class="navbar-right-items-auth-user__signin">
                <h3 class="navbar-right-items-auth-user__text link">Войти</h3>
            </div>
        </h3>
`)
