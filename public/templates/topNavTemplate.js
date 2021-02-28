//TODO make auth user(avatar and name)
//TODO add opportunity go to auth from navbar
export const renderTopNavView = Handlebars.compile(`
<div class="topnav">
    <a class="name" href="/">Project name</a>
    <a href="/basket" style="float: right; margin-right: 16px"><img src="static/cart.png" width="32" height="32" alt="Корзина"></a>
    <input type="text" id="address" class="address" name="firstname" placeholder="Адрес доставки">
</div>
`)