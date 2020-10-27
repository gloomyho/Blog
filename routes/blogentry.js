const express = require('express')
const router = express.Router()
const BlogEntry = require('../models/blogentry')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

router.get('/', (req, res) => {
})

//render make new entry page
router.get('/newEntry', (req, res) => {
  res.render('newEntry')
})

//make new blog entry
router.post('/newEntry', async(req, res) => {  
  const entry = new BlogEntry({
    title: req.body.title,
    text: req.body.text
  })
  if(req.body.image.data != null){
    saveImage(entry, req.body.image)
  }  
  try {    
    const newEntry = await entry.save()
    res.redirect(`/blogentry/${newEntry.id}`)
  } catch (error) {
    res.render('error', {
      error: error
    })
  } 
})

//show blog entry
router.get('/:id', async(req, res) => {
  try {
    const entry = await BlogEntry.findById(req.params.id)
    res.render('viewEntry', {
      entry: entry
    })
  } catch (error) {
    res.render('error', {
      error: error
    })
  }
})

//render edit page
router.get('/:id/edit', async (req, res) => {
  const entry = await BlogEntry.findById(req.params.id)
  try {
    res.render('editEntry', {
      entry: entry
    })
  } catch (error) {
    res.render('error', {
      error: error
    })
  }  
})
//update entry
router.put('/:id', async (req,res) => {
  const entry = await BlogEntry.findById(req.params.id)
  try {
    entry.title = req.body.title
    entry.text = req.body.text
    await entry.save()
    res.redirect(`/blogentry/${entry.id}`)
  } catch (error) {
    res.render('error', {
      error: error
    })
  }
})
//delete blog entry
router.delete('/:id', async (req, res)=> {
  let entry
  try {
    entry = await BlogEntry.findById(req.params.id)
    await entry.remove()    
    res.redirect('/')
  } catch (error) {
    if(entry == null){
      res.render('error', {
        message: "Entry could not be found",
        error: error
      })
    }
    else {
      res.render('error', {
        message: "Entry could not be deleted",
        error: error
      })
    }
}
})

function saveImage(entry, imageEncoded) {
  console.log(imageEncoded != null)
  if(imageEncoded != null) {
    const tmpEntry = JSON.parse(imageEncoded)
    if(tmpEntry != null && imageMimeTypes.includes(tmpEntry.type)) {
      entry.image = new Buffer.from(tmpEntry.data, 'base64')
      entry.imageType = tmpEntry.type
    }
  }
}

module.exports = router