const express = require('express')
// making a router
const router = express.Router()
// importing Song model to access database
const Song = require('../models/song')

router.get('/:id/edit', (req, res) => {
    const songId = req.params.id
    const userId = req.session.userId

    Song.findById(songId)
        .then(song => {
            if (userId === song.owner.userId) {
                res.render('songify/edit', { song })
            } else {
                res.json({error: 'This user does not own this song'})
            }
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('songify/new', { username, loggedIn })
})

router.post('/', (req, res) => {
    req.body.owner = req.session.userId

    console.log(req.body)
    Song.create(req.body)
        .then(song => {
            console.log(song)
            res.redirect('/songify')
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/', (req, res) => {
    if (req.session.username) {
        Song.find({})
            .then(songs => {
                res.render('songify/index', { songs })
            })
            .catch(err => {
                res.json(err)
            })
    }
})

router.get('/:id', (req, res) => {
    const songId = req.params.id

    Song.findById(songId)
        .then(song => {
            const userId = req.session.userId
            const username = req.session.username
            res.render('songify/show', { song, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router