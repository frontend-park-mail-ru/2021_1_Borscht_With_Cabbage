export const renderTopNavView = window.Handlebars.compile(`
<div class="topnav">
    <a class="name" href="/">Delivery Borscht</a>

    <div class="navbar-right_items">
        <input type="text" id="address" class="address" name="firstname" placeholder="Адрес доставки">
        <div id="auth_block" class="navbar-auth_block" style="float: right; margin-right: 16px"></div>
        <a href="/basket" class="basket-link">
            <div class="basket-container">
                <img src="../../static/cart.png" width="32" height="32" alt="Корзина" class="basket-image">
                <h3 class="basket-text">Корзина</h3>    
            </div>
        </a>
    </div>
</div>
`);

export const renderAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar-auth_user_block" id="js_toProfile">
            <img src="{{ user.avatar }}" class="navbar-avatar" alt="ava" id="avatar">
            <div class="navbar-username" id="navbar-username">
                <h3>{{user.name}}</h3>
            </div>
        </h3>
`)

export const renderNotAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar-auth_user_block" id="js_goLogin">
            <div class="navbar-signin">
                <h3 class="navbar-signin-text">Войти</h3>
            </div>
        </h3>
`)
