const mongoose = require('mongoose')
// const Song = require('./song')

const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Playlist = mongoose.model("playlist", playlistSchema)

module.exports = Playlist