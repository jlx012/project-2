const express = require('express')
// making a router
const router = express.Router()
// importing Song model to access database
const Song = require('../models/song')
const Playlist = require('../models/playlist')

router.delete('/:id', (req, res) => {
    const songId = req.params.id

    Song.findByIdAndRemove(songId)
        .then(song => {
            res.redirect('/musicapp')
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/create', (req, res) => {
    const song = {
        artist: req.body.artist,
        title:  req.body.title,
        genre:  req.body.genre,
        album:  req.body.album,
        image:  req.body.image
    }
    Song.create(song)
        .then(song => {
            Playlist.findById(req.body.list)
                .then(playlist => {
                    playlist.song.push(song._id)
                    playlist.save()
                    res.redirect(`/playlists/mine/${playlist._id}`)
                })
                .catch(err => {
                    res.json(err)
                })
        }) 
        .catch(err => {
            res.json(err)
        })
}) 


router.put('/:id', (req, res) => {
    const songId = req.params.id

    Song.findByIdAndUpdate(songId, req.body, { new: true })
        .then(song => {
            res.redirect(`/musicapp/${song._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/:id/edit', (req, res) => {
    const songId = req.params.id
    const userId = req.session.userId

    Song.findById(songId)
        .then(song => {
            if (userId == song.owner) {
                res.render('musicapp/edit', { song })
            } else {
                res.json({error: 'This user does not own this song'})
            }
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/newSong', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('musicapp/new', { username, loggedIn })
})

router.post('/', (req, res) => {
    req.body.owner = req.session.userId

    console.log(req.body)
    Song.create(req.body)
        .then(song => {
            console.log(song)
            res.redirect('/musicapp')
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/', (req, res) => {
    const userId = req.session.username
    if (userId) {
        // const api_key = 'http://ws.audioscrobbler.com/2.0/?api_key=dea536b213d6fe9210d196b96ad1040e&format=json'
        Song.find({})
            .then(songs => {
                Playlist.find({})
                    .then(playlists => {
                        res.render('musicapp/index', { songs, playlists, userId })
                    })
                    .catch(err => {
                        res.json(err)
                    })
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
            res.render('musicapp/show', { song, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router