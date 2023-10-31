// DEFINE EXPRESS APPLICATION HERE - ENTRY POINT OF APPLICATION

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const postRoute = require('./routes/posts')
const userRoute = require('./routes/user')
const imageRoute = require('./routes/image')

app.use(bodyParser.json())

// Express.static make this directory public, so you can access image publicily
app.use('/image', express.static('uploads'));

// by using app.use we can run middleware as a middleware for incoming request 
app.use('/api',postRoute)
app.use('/api',userRoute)
app.use('/api',imageRoute)

app.get('/',(req, res)=>{
    res.send('HELLO WORLD')
})

module.exports = app