const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const methodOverride = require('method-override')

const database = require('./config/database')
const indexRouter = require('./routes/index')
const entryRouter = require('./routes/blogentry')
const bodyParser = require('body-parser')

//use pug as view engine
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
//serve static files
app.use(express.static('public'))
//middleware functions
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(methodOverride('_method'))
//routes
app.use('/', indexRouter)
app.use('/blogentry', entryRouter)

//server listening
app.listen(process.env.PORT || 8080)
