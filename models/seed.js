const mongoose = require('./connection')
const Song = require('./song')

const db = mongoose.connection

db.on('open', () => {
    const startingSongs = [
        { 
            artist: "Harry Styles", 
            title: "As It Was", 
            genre: "Pop Rock",
            album: "Harry's House",
            image: "https://charts-static.billboard.com/img/2022/04/harry-styles-bma-as-it-was-po3-180x180.jpg",
        },
        { 
            artist: "Lizzo", 
            title: "About Damn Time", 
            genre: "Funk",
            album: "Special",
            image: "https://charts-static.billboard.com/img/2022/04/lizzo-o9x-about-damn-time-f6q-180x180.jpg",
        },
        { 
            artist: "Jack Harlow", 
            title: "First Class", 
            genre: "Hip-Hop/Rap",
            album: "Come Home the Kids Miss You",
            image: "https://charts-static.billboard.com/img/2018/01/jack-harlow-i43-180x180.jpg",
        },
        { 
            artist: "Kate Bush", 
            title: "Running Up That Hill(A Deal With God", 
            genre: "New Wave",
            album: "The Whole Story",
            image: "https://charts-static.billboard.com/img/2021/03/kate-bush-qv2-running-up-that-hill-1cx-180x180.jpg",
        },
        { 
            artist: "Future", 
            title: "Wait For U", 
            genre: "Hip-Hop/Rap",
            album: "I Never Liked You",
            image: "https://charts-static.billboard.com/img/1988/03/future-f8b-180x180.jpg",
        },
        { 
            artist: "Glass Animals", 
            title: "Heat Waves", 
            genre: "Alternative Indie",
            album: "Dreamland",
            image: "https://charts-static.billboard.com/img/2020/07/glass-animals-rtd-heat-waves-o3i-180x180.jpg",
        },
        { 
            artist: "Beyonce", 
            title: "Break My Soul", 
            genre: "House",
            album: "Renaissance",
            image: "https://charts-static.billboard.com/img/2022/07/beyonce-0na-break-my-soul-kqf-180x180.jpg",
        },
        { 
            artist: "Latto", 
            title: "Big Energy", 
            genre: "R&B/Soul",
            album: "777",
            image: "https://charts-static.billboard.com/img/2021/10/latto-80q-big-energy-89t-180x180.jpg",
        },
        { 
            artist: "Harry Styles", 
            title: "Late Night Talking", 
            genre: "Alternative Indie",
            album: "Harry's House",
            image: "https://charts-static.billboard.com/img/2017/04/harry-styles-psx-180x180.jpg",
        },
        { 
            artist: "Morgan Wallen", 
            title: "Wasted On You", 
            genre: "Country",
            album: "Dangerous: The Double Album",
            image: "https://charts-static.billboard.com/img/2021/01/morgan-wallen-nlu-wasted-on-you-32x-180x180.jpg",
        },
    ]
    

    Song.remove({})
        .then(deletedSongs => {
            console.log('this is what remove returns', deletedSongs)

            Song.create(startingSongs)
                .then(data => {
                    console.log('the new songs', data)
                    db.close()
                })
                .catch(error => {
                    console.log('error:', error)
                    db.close() 
                })
        })
        .catch(error => {
            console.log('error:', error)
            db.close()
        })
})