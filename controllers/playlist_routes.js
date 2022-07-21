const express = require('express')
const Playlist = require('../models/playlist')
const User = require('../models/user')
const Song = require('../models/song')
const router = require('./user_routes')

router.get('/new', (req, res) => {
    const username = req.session.username
    res.render('playlists/new', { username })
})

router.get('/mine/:id', (req, res) => {
    res.render('playlists/show')
})

router.get('/mine', (req, res) => {
    const ObjectId = req.session.userId

    Playlist.find({ owner: ObjectId })
        .then(playlists => {
            res.render('playlists/index', { playlists, ObjectId })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router