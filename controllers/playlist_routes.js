/////////////////////////////////
// Import dependencies
/////////////////////////////////
const express = require('express')


////////////////////////////////////////////
// Making a router
////////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////////
// Importing models
////////////////////////////////////////////
const Playlist = require('../models/playlist')

router.get('/new', (req, res) => {
    const userInfo = req.session.username
    res.render('playlists/new', { userInfo })
})

router.post('/mine', (req, res) => {
    req.body.owner = req.session.userId
    Playlist.create(req.body)
        .then(playlists => {
            res.redirect('/musicapp')
        })
        .catch(err => {
            res.json(err)
        })
})


module.exports = router