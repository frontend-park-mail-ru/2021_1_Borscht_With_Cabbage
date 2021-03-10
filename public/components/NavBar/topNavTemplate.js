export const renderTopNavView = window.Handlebars.compile(`
<div class="topnav">
    <a class="name" href="/">Delivery Borscht</a>

    <a href="/basket" style="float: right; margin-right: 16px"><img src="static/cart.png" width="32" height="32" alt="Корзина"></a>
    <div id="auth_block"></div>
    <input type="text" id="address" class="address" name="firstname" placeholder="Адрес доставки">
</div>
`);

export const renderAuthBlock = window.Handlebars.compile(`
        <a class="navbar-auth_user_block" href="/user">
            <img src="{{ user.avatar }}" class="navbar-avatar" alt="ava">
            <div class="navbar-username">
                {{user.name}}
            </div>
        </a>
`)

export const renderNotAuthBlock = window.Handlebars.compile(`
        <a class="navbar-auth_user_block" href="/signin">
            <div class="navbar-signin">
                signin
            </div>
        </a>
`)
