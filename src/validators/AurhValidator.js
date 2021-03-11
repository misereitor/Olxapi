const { checkSchema } = require('express-validator')
const { signin } = require('../controllers/AuthController')

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome precisa ter pelo menos duas letras'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: {
                    min: 6
                },
                errorMessage: 'A sua senha tem que ter no mínimo 6 caracteres'
            }
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: {
                    min: 6
                },
                errorMessage: 'A sua senha tem que ter no mínimo 6 caracteres'
            }
        },
    })
}