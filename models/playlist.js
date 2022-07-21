const mongoose = require('mongoose')
// const Song = require('./song')

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Playlist = mongoose.model("playlist", playlistSchema)

module.exports = Playlist