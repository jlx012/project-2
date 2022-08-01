
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = require('liquid-express-views')(express())

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

const session = require('express-session')
const MongoStore = require('connect-mongo')

const songRoutes = require('./controllers/song_routes')
const userRoutes = require('./controllers/user_routes')
const playlistRoutes = require('./controllers/playlist_routes')


app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI
		}),
		saveUninitialized: true,
		resave: false
	})
)

app.use('/playlists', playlistRoutes)
app.use('/users', userRoutes)
app.use('/musicapp', songRoutes)


app.get('/', (req, res) => {
	res.redirect('/users/login')
})

// const PORT = process.env.PORT
// app.listen(PORT, () => {
// 	console.log(`app is listening on port: ${PORT}`)
// })

app.listen(process.env.PORT || 3000)