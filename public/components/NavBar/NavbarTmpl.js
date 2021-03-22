export const renderTopNavView = window.Handlebars.compile(`
<div class="navbar">
    <a class="navbar__project-name" href="/">Delivery Borscht</a>

    <div class="navbar-right-items">
        <input type="text" id="address" class="navbar-right-items__address" name="firstname" placeholder="Адрес доставки">
        <div id="auth_block" class="navbar-right-items-auth" style="float: right; margin-right: 16px"></div>
        <a href="/basket" class="navbar-right-items-basket">
            <div class="navbar-right-items-basket-container">
                <img src="../../static/cart.png" width="32" height="32" alt="Корзина" class="navbar-right-items-basket-container__image">
                <h3 class="navbar-right-items-basket-container__text">Корзина</h3>    
            </div>
        </a>
    </div>
</div>
`);

export const renderAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar-right-items-auth-user" id="js_toProfile">
            <img src="{{ user.avatar }}" class="navbar-right-items-auth-user__avatar" alt="ava" id="avatar">
            <div class="navbar-right-items-auth-user__username" id="navbar-username">
                <h3>{{user.name}}</h3>
            </div>
        </h3>
`)

export const renderNotAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar-right-items-auth-user" id="js_goLogin">
            <div class="navbar-right-items-auth-user__signin">
                <h3 class="navbar-right-items-auth-user__text">Войти</h3>
            </div>
        </h3>
`)
