console.log('spa in action');

const application = document.getElementById('app');

const config = {
    login: {
        href: '/login',
        text: 'Авторизоваться!',
        open: loginPage,
    },
    basket: {
        href: '/basket',
        text: 'Корзина',
        open: basketPage,
    },
}

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function navbar() {
    application.innerHTML = '';

    let topnavbar = document.createElement('div');
    topnavbar.classList.add('topnav');
    let title = document.createElement('a');
    title.classList.add('name');
    title.href = '/';
    title.textContent = 'Project name';

    let basket = document.createElement('a');
    basket.style = 'float: right; margin-right: 16px';
    let basketImage = document.createElement('img');
    basketImage.src = 'cart.png';
    basketImage.alt = 'Корзина';
    basketImage.width = 32;
    basketImage.height = 32;
    basket.append(basketImage);

    let address = createInput('text', 'Адрес доставки', 'address');
    address.classList.add('address');
    address.id = 'address';

    topnavbar.append(title, basket, address);
    let auth = false;
    if (auth) {
        // TODO need to make img and profile menu (or just href)
    }

    application.append(topnavbar);
}

function menuPage() {
    navbar();
    loginPage();
}

function loginPage() {
    const form = document.createElement('form');
    form.classList.add('auth');

    const emailInput = createInput('email', 'Емайл', 'email');
    emailInput.classList.add('reg');
    const passwordInput = createInput('password', 'Пароль', 'password');
    passwordInput.classList.add('reg');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Авторизироваться!';
    submitBtn.classList.add('button-log');

    const signupParagraph = document.createElement('p');
    const signup = document.createElement('a');
    signup.href = '/signup';
    signup.textContent = 'Я тут впервые';
    signupParagraph.append(signup)

    form.append(emailInput, passwordInput, submitBtn, signupParagraph);


    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        ajax(
            'POST',
            '/login',
            {email, password},
            (status, response) => {
                if (status === 200) {
                    basketPage();
                } else {
                    const {error} = JSON.parse(response);
                    alert(error);
                }
            }
        )

    });

    application.append(form);
}

menuPage();

application.addEventListener('click', e => {
    const {target} = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();
        config[target.dataset.section].open();
    }
});

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}

function basketPage() {
    console.log('khm, puk')
}

