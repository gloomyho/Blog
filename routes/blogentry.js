const express = require('express')
const router = express.Router()
const BlogEntry = require('../models/blogentry')

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
    text: req.body.text,
  })
  try {
    const newEntry = await entry.save()
    res.redirect(`/blogentry/${newEntry.id}`)
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.redirect('/')
  }
})

//render edit page
router.get('/:id/edit', (req, res) => {
  const entry = BlogEntry.findById(req.params.id)
  res.render('editEntry', {
    entry: entry
  })
})
//update entry
router.put('/:id', async (req,res) => {
  let book
  try {
    book = await Book.findById(req.params.id)
    book.title = req.body.title
    book.author = req.body.author
    book.publishDate = new Date(req.body.publishDate)
    book.pageCount = req.body.pageCount
    book.description = req.body.description
    if(req.body.cover != null && req.body.cover !== '') {
      saveCover(book, req.body.cover)
    }
    await book.save()
    res.redirect(`/books/${book.id}`)
  } catch (error) {
    if(book != null) {
      renderEdit(res, book, true)
    }  
    else {
      redirect('/')
    }
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

module.exports = router