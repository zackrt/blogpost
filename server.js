// create express, morgon logging const
const express = require('express');

const morgan = require('morgan');
// create const blogPostRouter to pull from ./blogPostRouter .js
const blogPostRouter = require('./blogPostRouter');

const app = express();

app.use(morgan('common'));

app.use('/blog-posts',blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });