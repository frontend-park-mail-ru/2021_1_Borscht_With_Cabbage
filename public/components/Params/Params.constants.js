export const params = {
    time: {
        name: 'Время доставки',
        data: 'time',

        default: {
            name: '< 90 мин',
            data: 'max'
        },

        val: {
            not: {
                name: 'Не важно',
                data: 'not',
                value: 0
            },
            min: {
                name: '< 40 мин',
                data: 'min',
                value: 40
            },
            middle: {
                name: '< 60 мин',
                data: 'middle',
                value: 60
            },
            max: {
                name: '< 90 мин',
                data: 'max',
                value: 90
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
                name: 'Не важно',
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
            name: '0★',
            data: 'not'
        },

        val: {
            not: {
                name: 'Не важно',
                data: 'not',
                value: 0
            },
            min: {
                name: '3★',
                data: 'min',
                value: 3
            },
            middle: {
                name: '4★',
                data: 'middle',
                value: 4
            },
            max: {
                name: '4.5★',
                data: 'max',
                value: 4.5
            }
        }
    }
}
