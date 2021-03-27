export const renderNumButtons  = window.Handlebars.compile(`
    <div data-foodNumID="{{id}}" class="restaurant-content__add-buttons">
        <button class="minus" data-foodMinusButtonID="{{id}}">-</button>
        <button class="num" data-foodNumButtonID="{{id}}">{{num}}</button>
        <button class="plus" data-foodPlusButtonID="{{id}}">+</button>
    </div>
`)