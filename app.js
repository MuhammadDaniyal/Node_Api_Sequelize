// DEFINE EXPRESS APPLICATION HERE - ENTRY POINT OF APPLICATION

const express = require('express')
const app = express()
const postRoute = require('./routes/posts')

app.use('/api',postRoute)

app.get('/',(req, res)=>{
    res.send('HELLO WORLD')
})

module.exports = app