'use strict';

const express = require('express');
const body = require('body-parser');
const path = require('path');

const app = express();

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
    res.json(store);
});

app.get('/store', function (req, res) {
    res.json(storePage);
});

app.post('/login', function (req, res) {
    res.json({});
    // TODO
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
