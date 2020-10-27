const express = require('express')
const router = express.Router()
const BlogEntry = require('../models/blogentry')


router.get('/', async (req, res) => {  
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  if(page == null)
    page = 1
  if(limit == null)
    limit = 10
  try {
    const blogentriesCount = await BlogEntry.find()
    const blogentries = await BlogEntry.find().sort({date:-1}).skip((page-1) * 10).limit(limit)
    res.render('index', {
    blogentries: blogentries,
    blogentriesCount: blogentriesCount
  }) 
  } catch (error) {
    res.render('error', {
      message: "Cant display Entries",
      error: error
    })
  }
})

module.exports = router