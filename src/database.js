//creating the connection to mongo
const mongoose = require('mongoose')

//connecting to the db, useNewUrlParser is an extra setting from mongoose in order to avoid futere errors, it is a promise, so once connected log DB connected
mongoose.connect('mongodb://localhost/finterest',{
    useNewUrlParser: true
})
    .then(db=>console.log(`DB connected`))
    .catch(e=>console.error(e))