const mongoose = require('./connection')

const { Schema, model } = mongoose

const songSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        require: true
    },
    album: {
        type: String,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})


const Song = model('Song', songSchema)

module.exports = Song