
const express = require('express')
const User = require('../models/user')

const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/signup', async (req, res) => {
    console.log('this is our initial request body', req.body)

    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    console.log('this is request body after hashing', req.body)
    User.create(req.body)
        .then(user => {
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})


router.get('/login', (req, res) => {
    res.render('users/login')
})

router.get('/account', (req, res) => {
    let userId = req.session.userId

    res.render('users/show', { userId })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    console.log('this is the session', req.session)

    User.findOne({ username })
        .then(async (user) => {
            if (user) {
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user._id
                    console.log('this is the session after login', req.session)
                    res.redirect('/musicapp')
                } else {
                    res.json({ error: 'username or password incorrect' })
                }
            } else {
                res.json({ error: 'user does not exist' })
            }
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy(ret => {
        console.log('this is returned from req.session.destroy', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/users/login')
    })
})

module.exports = router