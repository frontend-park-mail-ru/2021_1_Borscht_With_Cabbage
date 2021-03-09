'use strict';

const COOKIE = 'cookie';

const express = require('express');
const body = require('body-parser');
const path = require('path');
const uuid = require('uuid');
const cookie = require('cookie-parser');

const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const users = {
    'a_katnov@mail.ru': 'password',
    'labzunova@gmail.com': 'password',
    'shishkin@yandex.ru': 'password'
};
const activeUsers = {};

const user = {
    name: "Oleg",
    email: "oleg@mail.ru",
    number: "88005553535"
}

const store = [
    {
        href: '/puk',
        name: 'Сыто пьяно',
        time: '60 минут',
        description: 'можно поесть и попить',
        rating: '5.0',
        cost: '800'
    },
    {
        href: '/puk',
        name: 'Сыто пьяно',
        time: '60 минут',
        description: 'можно поесть и попить',
        rating: '5.0',
        cost: '800'
    },
    {
        href: '/puk',
        name: 'Сыто пьяно',
        time: '60 минут',
        description: 'можно поесть и попить',
        rating: '5.0',
        cost: '800'
    },
    {
        href: '/puk',
        name: 'Сыто пьяно',
        time: '60 минут',
        description: 'можно поесть и попить',
        rating: '5.0',
        cost: '800'
    },
    {
        href: '/puk',
        name: 'Сыто пьяно',
        time: '60 минут',
        description: 'можно поесть и попить',
        rating: '5.0',
        cost: '800'
    }
];


const storePage = {
    title: 'Сыто пьяно',
    food: [
        {
            id: '1',
            name: 'Лапша лапшичка из столовки',
            img: 'static/food.jpg',
            cost: '25',
            description: 'не очень вкусно'
        },
        {
            id: '2',
            name: 'Борщик с капусткой',
            img: 'static/food.jpg',
            cost: '50',
            description: 'очень вкусно'
        },
        {
            id: '3',
            name: 'Вкус финансовой независимости',
            img: 'static/food.jpg',
            cost: '99999',
            description: 'описание'
        },
        {
            id: '4',
            name: 'Лапша лапшичка из столовки',
            img: 'static/food.jpg',
            cost: '25',
            description: 'не очень вкусно'
        },
        {
            id: '5',
            name: 'Борщик с капусткой',
            img: 'static/food.jpg',
            cost: '50',
            description: 'очень вкусно'
        },
        {
            id: '6',
            name: 'Вкус финансовой независимости',
            img: 'static/food.jpg',
            cost: '99999',
            description: 'описание'
        }
    ]
};

app.get('/auth', function (req, res) {
    const id = req.cookies[COOKIE];
    const email = activeUsers[id];
    if (!email || !users[email]) {
        return res.status(401).json({});
    }

    return res.status(200).json({ email: email, avatar: 'veryNicePic.png' });
});

app.get('/main', function (req, res) {
    const id = req.cookies[COOKIE];
    const email = activeUsers[id];
    if (!email || !users[email]) {
        return res.status(401).json({});
    }

    res.status(200).json({});
})

app.get('/restaurants', function (req, res) {
    const id = req.cookies[COOKIE];
    const email = activeUsers[id];
    if (!email || !users[email]) {
        return res.status(401).json({});
    }

    res.json(store);
});

app.get('/store', function (req, res) {
    const id = req.cookies[COOKIE];
    const email = activeUsers[id];
    if (!email || !users[email]) {
        return res.status(401).json({});
    }

    res.json(storePage);
});


app.get('/userProfile', function (req, res) {
    res.json(user);
});

app.post('/signin', function (req, res) {
    const email = req.body.email;
    const pass = req.body.password;

    if (users[email]) {
        if (users[email] === pass) {
            const id = uuid.v4();
            activeUsers[id] = email;
            res.cookie(COOKIE, id);
            return res.status(200).json({ email: email, avatar: 'veryNicePic.png' });
        }
    }

    return res.status(400).json({
        result: 'Не удаётся войти.\nПожалуйста, проверьте правильность написания логина и пароля.'
    });
});

app.post('/signup', function (req, res) {
    const email = req.body.email;
    const pass = req.body.password;

    if (users[email]) {
        return res.status(400).json({ result: 'Такой пользователь уже существует' });
    }

    users[email] = pass;
    const id = uuid.v4();
    activeUsers[id] = email;
    res.cookie(COOKIE, id);
    return res.status(200).json({ email: email, avatar: 'veryNicePic.png' });
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});


