export const renderTopNavView = window.Handlebars.compile(`
<div class="topnav">
    <a class="name" href="/">Borscht Delivery</a>
    <a href="/basket" style="float: right; margin-right: 16px"><img src="static/cart.png" width="32" height="32" alt="Корзина"></a>
    {{#if isUserAuth}}
        {{> authBlock user }}
    {{/if}}
    <input type="text" id="address" class="address" name="firstname" placeholder="Адрес доставки">
</div>
`);