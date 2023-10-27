// DEFINE EXPRESS APPLICATION HERE - ENTRY POINT OF APPLICATION

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const postRoute = require('./routes/posts')

app.use(bodyParser.json())

// by using app.use we can run middleware as a middleware for incoming request 
app.use('/api',postRoute)

app.get('/',(req, res)=>{
    res.send('HELLO WORLD')
})

module.exports = app