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

const mainPage = {
    category: [
        {
            name: 'sushi',
            text: 'Суши'
        },
        {
            name: 'pizza',
            text: 'Пицца'
        },
        {
            name: 'burgers',
            text: 'Бургеры'
        },
        {
            name: 'meat',
            text: 'Мясо'
        },
        {
            name: 'fast_food',
            text: 'Фастфуд'
        },
        {
            name: 'zosh',
            text: 'Здоровая еда'
        }
    ],
    filter: [
        {
            name: 'Время доставки',
            value: 'до 180 минут'
        },
        {
            name: 'Средний чек',
            value: 'до 2000 рублей'
        },
        {
            name: 'Рейтинг',
            value: 'неважен'
        }
    ],
    store: [
        {
            name: 'Сыто пьяно',
            time: '60 минут',
            description: 'можно поесть и попить',
            rating: '5.0',
            cost: '800'
        },
        {
            name: 'Сыто пьяно',
            time: '60 минут',
            description: 'можно поесть и попить',
            rating: '5.0',
            cost: '800'
        },
        {
            name: 'Сыто пьяно',
            time: '60 минут',
            description: 'можно поесть и попить',
            rating: '5.0',
            cost: '800'
        },
        {
            name: 'Сыто пьяно',
            time: '60 минут',
            description: 'можно поесть и попить',
            rating: '5.0',
            cost: '800'
        },
        {
            name: 'Сыто пьяно',
            time: '60 минут',
            description: 'можно поесть и попить',
            rating: '5.0',
            cost: '800'
        }
    ]
}

const storePage = {
    title: 'Сыто пьяно',
    food: [
        {
            name: 'Лапша лапшичка из столовки',
            img: 'static/food.jpg',
            cost: '25',
            description: 'не очень вкусно'
        },
        {
            name: 'Борщик с капусткой',
            img: 'static/food.jpg',
            cost: '50',
            description: 'очень вкусно'
        },
        {
            name: 'Вкус финансовой независимости',
            img: 'static/food.jpg',
            cost: 'бесценно',
            description: 'описание'
        },
        {
            name: 'Лапша лапшичка из столовки',
            img: 'static/food.jpg',
            cost: '25',
            description: 'не очень вкусно'
        },
        {
            name: 'Борщик с капусткой',
            img: 'static/food.jpg',
            cost: '50',
            description: 'очень вкусно'
        },
        {
            name: 'Вкус финансовой независимости',
            img: 'static/food.jpg',
            cost: 'бесценно',
            description: 'описание'
        }
    ]
};

app.get('/main', function (req, res) {
    const id = req.cookies[COOKIE];
    const email = activeUsers[id];
    if (!email || !users[email]) {
        return res.status(401).json({});
    }

    res.json(mainPage);
});

app.get('/store', function (req, res) {
    const id = req.cookies[COOKIE];
    const email = activeUsers[id];
    if (!email || !users[email]) {
        return res.status(401).json({});
    }

    res.json(storePage);
});

app.post('/login', function (req, res) {
    const email = req.body.email;
    const pass = req.body.password;

    if (users[email]) {
        if (users[email] === pass) {
            const id = uuid.v4();
            activeUsers[id] = email;
            res.cookie(COOKIE, id);
            return res.status(200).json({});
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
    return res.status(200).json({});
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
