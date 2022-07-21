const express = require('express')
const Playlist = require('../models/playlist')
const User = require('../models/user')
const Song = require('../models/song')
const router = require('./user_routes')

// router.post("/new", async (req, res) => {
//     const user = await User.findById(req.user._id)
//     const playList = await Playlist({ ...req.body, user: user._id }).save();
//     user.playlists.push(playList._id);
//     await user.save();
//     res.send({ data: playList })
// })

router.get('/playlists/:id', (req, res) => {
    res.render('playlists/show')
})

router.get('/playlists/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('playlists/new', { username, loggedIn })
})

router.get('/playlists', (req, res) => {
    res.render('playlists/index')
})

module.exports = router