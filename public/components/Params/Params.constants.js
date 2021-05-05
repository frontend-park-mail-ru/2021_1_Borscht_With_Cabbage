export const params = {
    time: {
        name: 'Время доставки',
        data: 'time',

        default: {
            name: '-',
            data: 'not'
        },

        val: {
            not: {
                name: '-',
                data: 'not',
                value: 0
            },
            min: {
                name: '< 20 мин',
                data: 'min',
                value: 20
            },
            middle: {
                name: '< 30 мин',
                data: 'middle',
                value: 30
            },
            max: {
                name: '< 60 мин',
                data: 'max',
                value: 60
            }
        }
    },
    receipt: {
        name: 'Средний чек',
        data: 'receipt',

        default: {
            name: '-',
            data: 'not'
        },

        val: {
            not: {
                name: '-',
                data: 'not',
                value: 0
            },
            min: {
                name: '< 500 ₽',
                data: 'min',
                value: 500
            },
            middle: {
                name: '< 1000 ₽',
                data: 'middle',
                value: 1000
            },
            max: {
                name: '< 2000 ₽',
                data: 'max',
                value: 2000
            }
        }
    },
    rating: {
        name: 'Рейтинг',
        data: 'rating',

        default: {
            name: '-',
            data: 'not'
        },

        val: {
            not: {
                name: '-',
                data: 'not',
                value: 0
            },
            min: {
                name: '❤3',
                data: 'min',
                value: 3
            },
            middle: {
                name: '❤4',
                data: 'middle',
                value: 4
            },
            max: {
                name: '❤4.5',
                data: 'max',
                value: 4.5
            }
        }
    }
}
