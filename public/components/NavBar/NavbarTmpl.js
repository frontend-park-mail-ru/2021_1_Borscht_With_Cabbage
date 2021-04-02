export const renderTopNavView = window.Handlebars.compile(`
<div class="navbar">
    <div class="navbar_title">
        <a class="navbar_title__project-name link" href="/">Delivery Borscht</a>
    </div>

    <div class="navbar_right-items">
        <input type="text" id="address" class="navbar_right-items__address" name="firstname" placeholder="Адрес доставки">
        <div id="auth_block" class="navbar_right-items-auth"></div>
        <a href="/basket" class="navbar_right-items_basket">
            <div class="navbar_right-items_basket_container">
                <img src="../../static/cart.png" alt="Корзина" class="navbar_basket-image">
                <h3 class="navbar_right-items_basket_container__text link">Корзина</h3>    
            </div>
        </a>
    </div>
</div>
<div class="view" id="view-place" style="position: relative;">

</div>
`);

export const renderAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar_right-items_auth_user link" id="js-go-profile">
            <img src="{{ user.avatar }}" class="navbar_right-items_auth-user__avatar" alt="ava" id="avatar">
            <div class="navbar_right-items_auth-user__username" id="navbar-username">
                <h3>{{user.name}}</h3>
            </div>
        </h3>
`)

export const renderNotAuthBlock = window.Handlebars.compile(`
        <h3 class="navbar_right-items_auth_user link" id="js-go-login">
            <div class="navbar_right-items_auth_user__signin">
                <h3 class="navbar_right-items_auth_user__text link">Войти</h3>
            </div>
        </h3>
`)
