const mongoose = require('./connection')
// const Song = require('./song')
const { Schema, model } = mongoose

const playlistSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    song: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
}, {
    timestamps: true
})

const Playlist = model('Playlist', playlistSchema)

module.exports = Playlist