const { checkSchema } = require('express-validator')
const { signin } = require('../controllers/AuthController')

module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome precisa ter pelo menos duas letras'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            isLength: {
                options: {
                    min: 6
                },
                errorMessage: 'A sua senha tem que ter no mínimo 6 caracteres'
            }
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),
}