export const params = {
    time: {
        name: 'Время доставки',
        data: 'time',

        default: {
            name: '< 120 мин',
            data: 'max'
        },

        val: {
            not: {
                name: '-',
                data: 'not'
            },
            min: {
                name: '< 45 мин',
                data: 'min'
            },
            middle: {
                name: '< 60 мин',
                data: 'middle'
            },
            max: {
                name: '< 120 мин',
                data: 'max'
            }
        }
    },
    receipt: {
        name: 'Средний чек',
        data: 'receipt',

        default: {
            name: '< 2000 ₽',
            data: 'max'
        },

        val: {
            not: {
                name: '-',
                data: 'not'
            },
            min: {
                name: '< 500 ₽',
                data: 'min'
            },
            middle: {
                name: '< 1000 ₽',
                data: 'middle'
            },
            max: {
                name: '< 2000 ₽',
                data: 'max'
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
                data: 'not'
            },
            min: {
                name: '❤3',
                data: 'min'
            },
            middle: {
                name: '❤4',
                data: 'middle'
            },
            max: {
                name: '❤4.5',
                data: 'max'
            }
        }
    }
}
