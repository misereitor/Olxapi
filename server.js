require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')
const apiRouter = require('./src/routes')
const env = process.env

mongoose.connect(env.DATABASE, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise
mongoose.connection.on('error', (error) => {
    console.log("Erro: ", error.message)
})

const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(fileupload())

server.use(express.static(__dirname + '/public'))

server.use('/', apiRouter)

server.listen(env.PORT || 8080, () => {
    console.log('Servidor rodando na porta ' + env.PORT)
})