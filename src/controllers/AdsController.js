const Ad = require('../models/Ad')
const Category = require('../models/Category')
const User = require('../models/User')
const mongoose = require('mongoose')
const State = require('../models/State')

module.exports = {
    getCategories: async (req, res) => {
        const cats = await Category.find()

        let categories = []
        for (let i in cats) {
            categories.push({
                ...cats[i]._docs,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        }
        res.json({ categories })
    },
    addAction: async (req, res) => {
        const token = req.body.token
        const user = await User.findOne({ token })
        if (!user) {
            res.json({ error: 'E-mail e/ou senha errados!' })
            return
        }
        let state = ''
        const stateUser = req.body.state
        if (mongoose.Types.ObjectId.isValid(stateUser)) {
            const stateCheck = await State.findById(stateUser)
            if (!stateCheck) {
                res.json({ error: 'Estado não existe' })
                return
            }
            state = stateUser
        } else {
            res.json({ error: 'Estado não existe' })
            return
        }
        const ads = new Ad({
            idUser: user._id,
            state,
            category: req.body.cat,
            title: req.body.title,
            price: req.body.price,
            priceNegotiable: req.body.priceneg,
            description: req.body.description,
            views: 1,
            status: 'Ativo',
            dataCreated: Date.now()
            //images: req.file.filename
        })
        await ads.save()
        res.json({})
    },
    getList: async (req, res) => {
        const ads = await Ad.find()
        console.log(ads)
        res.json({})
    },
    getitem: async (req, res) => {

    },
    editAction: async (req, res) => {

    }
}