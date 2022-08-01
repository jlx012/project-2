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

router.delete('/mine/:id', (req, res) => {
    const playlistId = req.params.id

    Playlist.findByIdAndRemove(playlistId)
        .then(playlist => {
            res.redirect('/playlists/mine')
        })
})

router.get('/new', (req, res) => {
    const userInfo = req.session.username

    res.render('playlists/new', { userInfo })
})

router.post('/mine', (req, res) => {
    req.body.owner = req.session.userId

    Playlist.create(req.body)
        .then(playlists => {
            res.redirect(`mine`)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/mine', (req, res) => {
    const userInfo = req.session.username

    Playlist.find({ owner: req.session.userId })
        .then(playlists => {
            res.render('playlists/index', { playlists, userInfo })
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/mine/:id', (req, res) => {
    const playlistId = req.params.id
    const userInfo = req.session.username

    Playlist.findById(playlistId)
        .populate("song")
        .then(playlist => {
            const userId = req.session.userId
            const username = req.session.username
            res.render('playlists/show', { playlist, userId, username, userInfo})
        })
        .catch(err => {
            res.json(err)
        })
})


module.exports = router