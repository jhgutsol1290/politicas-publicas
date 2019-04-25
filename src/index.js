//importing all constants we are using on the runing file
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid/v4')
const {format} = require('timeago.js')

//Initializations - inicialize the server, db
const app = express()
require('./database')

//Settings - assigning ports, view engine, current directory is assigned in views, port is given by provier or use port 3000.
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Middlewares - is a code block that is excecuted between user req til the req gets the server. morgan is used for obtaining the requests to ehe web page
//urlencoded is used for extracting the data in req.body."title" in routes
//multer is used for managing the uploading of files to the server. diskStorage provides full control on storing files. Destination and filename are available. Destination - where the file is stored, filename - the name of the file inside the folder, filename recieves four params: req, file, cd, filename, we are using cb(callback) and file, cb recieves two params, fisrt must be null and second we concatenate uuid (in order to diferrenciate the file from others) and path.extname(file.originalname) which returns the extension of the original file, getting as a result => uuid + extname.
//multer storage saves the storage in the const storage that has been created before, it also can be named as dest => dest: storage.
//static files are used for CSS, img´s, and more.
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
})
app.use(multer({
    storage: storage
}).single('image'))

app.use('/public', express.static('public'));


//Global variables - this is used for the format of one day ago.
app.use((req, res, next)=>{
    app.locals.format = format
    next()
})

//Routes - importing the routes. Routes refrences to how an app answers to a user req in a certain end point (URI) and a method (GET, POST...)
app.use(require('./routes/index'))
//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Start server - starts the server on the port given
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})