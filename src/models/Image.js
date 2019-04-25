//this is the schema(DB) that is going to be used on the project, we have to import it in order to be available on the routes file
const {Schema, model} = require('mongoose')

const imageSchema = new Schema({
    title: {type: String},
    description: {type: String},
    axis: {type: String},
    status: {type: String},
    presented: {type: Date},
    tweets: {type: Number},
    radio: {type: Number},
    tv: {type: Number},
    comments: {type: String},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: {type: Number},
    created_at: {type: Date, default: Date.now()}
})
//when exporting we have to first determine the name with capital letter and the name of the schema that has been defined at the beginning
module.exports = model('Image', imageSchema)