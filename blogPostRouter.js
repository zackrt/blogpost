const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');
// GET part of the, Read of CRUD
router.get('/', (req,res) => {
    res.json(BlogPosts.get());
})
// CREATE part of CRUD
router.post('/', jsonParser, (req, res) => {
  // ensure `title` and `content` are in request body
  const requiredFields = ['title', 'content','author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

//UPDATE requests of CRUD, using .put() review with luis .params vs .body
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = [
        'id', 'title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  });

//unix format is how many seconds has passed 1/1/1970
//DELETE requests of CRUD
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.body.id);
    console.log(`Deleted blog post with id \`${req.body.ID}\``);
    res.status(204).end();
  });




module.exports = router;