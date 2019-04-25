//importing Router from express and assigning it to a variable
const {Router} = require('express')
const router = Router()

//importing the model Image and assigning it to a const Image
const Image = require('../models/Image')

//the first route is / . It is an asynchronous func so we use asyn await. The method used is GET, then we have a func (req, res), we assign await to the const images because it takes time in order to find in the DB, as Image is a model we can use the methos of monog in order no list(find()) the images selected. Finally, we use res. render, in order to render index.ejs, which route has been declared in views on the index file, then we pass images as an object in order to recieve it in the index.ejs and so we can manipulate all the amges found in the DB.
router.get('/', async (req, res) =>{
    const images = await Image.find()
    res.render('index', {images})
})

//this route only renders a form that uploads data. It works with GET method
router.get('/upload', (req, res)=>{
    res.render('upload')
})

//this route posts in the same route as before, it doesn´t affect because it uses different methods(GET and POST). It uses async/await in the func (req, res). image is equls to a new model Image, as we have declared image we now have to assign the properties that are available on req.body thanks to urlencoded from the index file. We assign all the properties of the object to the new one. Then we wait and use the data with the mongo method save() in order to save in the DB. Then we redircet to /
router.post('/upload', async (req, res)=>{
    const image = new Image()
    image.title = req.body.title
    image.description = req.body.description
    image.axis = req.body.axis
    image.status = req.body.status
    image.presented = req.body.presented
    image.tweets = req.body.tweets
    image.radio = req.body.radio
    image.tv = req.body.tv
    image.comments = req.body.comments
    image.filename = req.file.filename
    image.path = '/img/uploads/' + req.file.filename
    image.originalname = req.file.originalname
    image.mimetype = req.file.mimetype
    image.size = req.file.size

    await image.save()
    res.redirect('/')
})

//when consulting a single image we have to pass through URL the id of the image. We recieve the id from req.params (from URL) and save it into {id}, then we use a mongo method in order to  find it by id on DB. Then render the profile.ejs file passing image as property in order to manipulate data based on the single element.
router.get('/image/:id', async (req, res)=>{
    const {id} = req.params
    const image = await Image.findById(id)
    console.log(image)
    res.render('profile', {image})
})

//when editing a policy we have to recieve the id from req.params just as in consulting. Then we find the single policy, then we render the edit.ejs file and pass image as a property. In this case edit uses methos GET, so it only renders a form to edit data
router.get('/edit/:id', async (req, res)=>{
    const {id} = req.params
    const image = await Image.findById(id)
    res.render('edit', {image})
})

//the method post updates a single policy, so we recieve the id from req.params, then we update what we recieve from req.body finfind the id recieved before. then we redirect to /.
router.post('/edit/:id', async (req, res)=>{
    const {id} = req.params
    await Image.update({_id:id}, req.body)
    res.redirect('/')
})

//this route is not used in the project, but it can be used in order to delete a policy.
router.get('/image/:id/delete', (req, res)=>{
    res.send('Image deleted')
})

//we have to export, then it is available on index file than runs the server.
module.exports = router