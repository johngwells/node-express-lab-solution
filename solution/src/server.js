const bodyParser = require('body-parser');
const express = require('express');
// const data = require('./todos');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
// const posts = [
//   { title: 'my awesome title', content: "This is content"},
// ];
const posts = [];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
// server.get('/', (req, res) => {
//   console.log(req.query);
//   res.send(data.todos);
// })
server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const filtered = posts.filter((post) => {
      return post.title.indexOf(post) !== -1 || post.contents.indexOf(post) !== -1;
    });
    res.json(filtered);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  // this is object destructing
  const { title, contents } = req.body;
  let id = 0;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'We need some content from you' });
    return;
  }
  const newPost = {
    id,
    title,
    contents,
  };

  posts.push(newPost);
  res.json(newPost);
});

server.put('/posts', (req, res) => {
  const { title, contents } = req.body;
  let { id } = req.body;

  // update post *** NOT WORKING YET ***
  const updatedPost = {
    id,
    title,
    contents,
  }
  posts.push(updatedPost);

  // check if id, title, contents are missing
  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'id, title, or contents is missing' });
    return;
  } 

  // check for bad id or id used already
  if (id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'bad id'});
    return;
  }
  res.json(posts);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  // reports missing id
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'id is missing'});
    return;
  }
  // reporst bad id
  if (id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'bad id'});
    return;
  }
  res.json(posts);
});

module.exports = { posts, server };
