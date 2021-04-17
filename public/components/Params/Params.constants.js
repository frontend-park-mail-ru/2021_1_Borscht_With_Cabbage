export const params = {
    time: {
        name: 'Время доставки',
        data: 'time',

        default: {
            name: 'до 120 минут',
            data: 'max'
        },

        val: {
            not: {
                name: 'не важно',
                data: 'not'
            },
            min: {
                name: 'до 45 минут',
                data: 'min'
            },
            middle: {
                name: 'до 60 минут',
                data: 'middle'
            },
            max: {
                name: 'до 120 минут',
                data: 'max'
            }
        }
    },
    receipt: {
        name: 'Средний чек',
        data: 'receipt',
        
        default: {
            name: 'до 2000',
            data: 'max'
        },

        val: {
            not: {
                name: 'не важен',
                data: 'not'
            },
            min: {
                name: 'до 500',
                data: 'min'
            },
            middle: {
                name: 'до 1000',
                data: 'middle'
            },
            max: {
                name: 'до 2000',
                data: 'max'
            }
        }
    },
    rating: {
        name: 'Рейтинг',
        data: 'rating',
        
        default: {
            name: 'не важен',
            data: 'not'
        },

        val: {
            not: {
                name: 'не важен',
                data: 'not'
            },
            min: {
                name: 'от 500',
                data: 'min'
            },
            middle: {
                name: 'от 1000',
                data: 'middle'
            },
            max: {
                name: 'от 2000',
                data: 'max'
            }
        }
    }
}
